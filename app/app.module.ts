import { NgModule }      from '@angular/core'

import { BrowserModule } from '@angular/platform-browser'
import { FormsModule }   from '@angular/forms'
import { HttpModule }     from '@angular/http'

import { AppComponent }  from './app.component'
import { routing }        from './app.routing'

import { DashboardComponent }  from './dashboard/dashboard.component'

import { ProfileService } from './services/profile.service'
import { SessionService } from './services/session.service'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  providers: [
    ProfileService,
    SessionService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
