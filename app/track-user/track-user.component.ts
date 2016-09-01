import { Component, OnInit } from '@angular/core'
import { AgAware } from 'ag-grid-ng2/main'

@Component({
  selector: 'track-user',
  template: `
    <div *ngIf="params.value === 1">
      Yes
    </div>
    <div *ngIf="params.value === 0">
      No
    </div>
  `
})
export class TrackUserComponent implements AgAware {

  private params:any;

  agInit(params:any):void {
    this.params = params;
  }
}
