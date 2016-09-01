import { Component, ViewContainerRef, OnInit } from '@angular/core'
import { DatePipe } from '@angular/common'
import { AgGridNg2, AgComponentFactory } from 'ag-grid-ng2/main'
import { GridOptions } from 'ag-grid/main'

import { Profile } from '../models/profile'
import { ProfileService } from '../services/profile.service'

import { Session } from '../models/session'
import { SessionService } from '../services/session.service'

import { TrackUserComponent } from '../track-user/track-user.component'

@Component({
  selector: 'rich-grid',
  templateUrl: 'app/rich-grid/rich-grid.component.html',
  directives: [AgGridNg2],
  providers: [AgComponentFactory]
})
export class RichGridComponent implements OnInit {

  private gridOptions: GridOptions
  private showGrid: boolean
  private rowData: any[]
  private columnDefs: any[]
  private rowCount: string

  constructor(private profileService: ProfileService, private sessionService: SessionService,
    private viewContainerRef: ViewContainerRef, private agComponentFactory: AgComponentFactory) {}

  ngOnInit(): void {
    this.createColumnDefs()
    this.createRowData()
    this.gridOptions = <GridOptions>{}
    this.showGrid = true
  }

  refreshData(): void {
    this.profileService.refreshProfiles()
    this.createRowData()
    this.gridOptions.api.refreshView()
  }

  private createRowData() {
    let rowData: any[] = []

    for(let profile of this.profileService.getProfiles()) {
      let nbExercisesDone: number = Object.keys(profile.progression).length
      let nbAbsences: number = this.computeNbAbsences(profile)
      let data: any = {
        name: profile.fullName,
        email: profile.email,
        branchName: profile.branchName,
        trackUser: profile.trackUser ? 1 : 0,
        nbExercisesDone: nbExercisesDone,
        nbAbsences: nbAbsences,
      }
      for(let session of this.sessionService.getSessions()) {
        data[`hasAttended-session-${session.id}`] = profile.attendance[session.id] ? 1 : 0
        data[`progression-session-${session.id}`] = this.computeProgression(profile, session)
      }

      rowData.push(data)
    }

    this.rowData = rowData
  }

  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: '#',
        width: 30,
        checkboxSelection: true,
        suppressSorting: true,
        suppressMenu: true,
        pinned: true
      },
      {
        headerName: 'User',
        children: [
          { headerName: 'Name', field: 'name', pinned: true },
          { headerName: 'Email', field: 'email', pinned: true },
          { headerName: 'Branch', field: 'branchName', pinned: true },
          { headerName: 'Track', field: 'trackUser', pinned: true, cellRenderer: this.agComponentFactory.createCellRendererFromComponent(TrackUserComponent) },
        ]
      },
      {
        headerName: 'Summary',
        children: [
          { headerName: 'Nb exercises', field: 'nbExercisesDone', pinned: true },
          { headerName: 'Nb absences', field: 'nbAbsences', pinned: true },
        ]
      }
    ]

    for(let session of this.sessionService.getSessions()) {
      const datePipe: DatePipe = new DatePipe()
      const headerName: string = `${ datePipe.transform(session.from, 'dd/MM/yyyy') } ${ datePipe.transform(session.from, 'HH:mm') } - ${ datePipe.transform(session.to, 'HH:mm') }`
      this.columnDefs.push({
        headerName: headerName,
        children: [
          { headerName: 'Has attended', field: `hasAttended-session-${session.id}`, pinned: true },
          { headerName: 'Progression', field: `progression-session-${session.id}`, pinned: true },
        ]
      })
    }
  }

  private computeNbAbsences(profile: Profile): number {
    const nbAttended: number = Object.keys(profile.attendance).length
    const nbSessions: number = this.sessionService.getPreviousSessions().length
    return nbSessions - nbAttended
  }

  private computeProgression(profile: Profile, session: Session): number {
    const nbKeyExercises: number = session.keyExercises.length || 1
    let nbKeyExercisesDone: number = 0
    for(let keyExercise of session.keyExercises) {
      if(profile.progression[keyExercise]) {
        nbKeyExercisesDone += 1
      }
    }
    return nbKeyExercisesDone / nbKeyExercises * 100
  }

  private onGridReady() {
    if (this.gridOptions.api && this.columnDefs) {
      let allColumnIds: Array<string> = []
      for(let columnDef of this.columnDefs) {
        allColumnIds.push(columnDef.field)
      }
      this.gridOptions.columnApi.autoSizeColumns(allColumnIds);
      this.gridOptions.api.refreshView();
    }
  }
}
