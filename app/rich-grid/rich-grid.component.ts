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

  private showOnlyPreviousSessions: boolean = false

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
      .then(() => {
        this.createRowData()
        this.gridOptions.api.refreshView()
      })
  }

  private createRowData() {
    let rowData: any[] = []

    for(let profile of this.profileService.getProfiles()) {
      let nbExercisesDone: number = Object.keys(profile.progression).length
      let nbAbsences: number = this.computeNbAbsences(profile)
      let data: any = {
        name: profile.fullName,
        email: profile.email,
        trackUser: profile.trackUser ? 1 : 0,
        nbExercisesDone: nbExercisesDone,
        nbAbsences: nbAbsences,
      }
      const sessions = this.showOnlyPreviousSessions ? this.sessionService.getPreviousSessions() : this.sessionService.getSessions()
      for(let session of sessions) {
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
        headerName: 'User',
        children: [
          { headerName: 'Track', field: 'trackUser', width: 75, pinned: true, cellRenderer: this.agComponentFactory.createCellRendererFromComponent(TrackUserComponent) },
          { headerName: 'Name', field: 'name', pinned: true },
          { headerName: 'Email', field: 'email', pinned: true },
        ]
      },
      {
        headerName: 'Summary',
        children: [
          { headerName: 'Nb exercises', field: 'nbExercisesDone', width: 100, pinned: true },
          { headerName: 'Nb absences', field: 'nbAbsences', width: 100, pinned: true },
        ]
      }
    ]

    const sessions = this.showOnlyPreviousSessions ? this.sessionService.getPreviousSessions() : this.sessionService.getSessions()
    for(let session of sessions) {
      const datePipe: DatePipe = new DatePipe()
      const headerName: string = `${ datePipe.transform(session.from, 'dd/MM/yyyy') } ${ datePipe.transform(session.from, 'HH:mm') } - ${ datePipe.transform(session.to, 'HH:mm') }`
      this.columnDefs.push({
        headerName: headerName,
        children: [
          { headerName: 'Has attended', field: `hasAttended-session-${session.id}`, width: 100, pinned: true, cellRenderer: this.agComponentFactory.createCellRendererFromComponent(TrackUserComponent) },
          { headerName: 'Progression', field: `progression-session-${session.id}`, width: 100, pinned: true },
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

  private toggleShowOnlyPreviousSessions() {
    this.showOnlyPreviousSessions = !this.showOnlyPreviousSessions
    this.createColumnDefs()
    this.gridOptions.api.refreshView()
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
