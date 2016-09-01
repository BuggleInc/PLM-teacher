import { NgModule }      from '@angular/core'

import { BrowserModule } from '@angular/platform-browser'
import { FormsModule }   from '@angular/forms'
import { HttpModule }     from '@angular/http'

import { AppComponent }  from './app.component'
import { routing }        from './app.routing'

import { DashboardComponent }  from './dashboard/dashboard.component'
import { RichGridComponent }  from './rich-grid/rich-grid.component'

import { ExerciseService } from './services/exercise.service'
import { GitHubAPIService } from './services/github-api.service'
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
    RichGridComponent,
  ],
  providers: [
    ExerciseService,
    GitHubAPIService,
    ProfileService,
    SessionService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
