import { Component } from '@angular/core'
import { DatePipe } from '@angular/common'
import { AgGridNg2 } from 'ag-grid-ng2/main'
import { GridOptions } from 'ag-grid/main'

import { ProfileService } from '../services/profile.service'
import { SessionService } from '../services/session.service'

@Component({
  selector: 'rich-grid',
  templateUrl: 'app/rich-grid/rich-grid.component.html',
  directives: [AgGridNg2],
})
export class RichGridComponent {

  private gridOptions: GridOptions
  private showGrid: boolean
  private rowData: any[]
  private columnDefs: any[]
  private rowCount: string

  constructor(private profileService: ProfileService, private sessionService: SessionService) {}

  init(): void {
    this.createColumnDefs()
    this.createRowData()
    this.gridOptions = <GridOptions>{}
    this.showGrid = true
  }

  private createRowData() {
    var rowData: any[] = []

    for(let profile of this.profileService.getProfiles()) {
      let nbExercisesDone: number = 5
      let nbAbsences: number = 1
      let branchName: string = 'PLMrandom'
      var data: any = {
        name: profile.fullName,
        email: profile.email,
        branchName: branchName,
        trackUser: profile.trackUser,
        nbExercisesDone: nbExercisesDone,
        nbAbsences: nbAbsences,
      }
      for(let session of this.sessionService.getSessions()) {
        data[`hasAttended-session-${session.id}`] = false
        data[`progression-session-${session.id}`] = 50
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
          { headerName: 'Track', field: 'trackUser', pinned: true },
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
