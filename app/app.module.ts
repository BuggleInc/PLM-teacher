import { NgModule }      from '@angular/core'

import { BrowserModule } from '@angular/platform-browser'
import { FormsModule }   from '@angular/forms'
import { HttpModule }     from '@angular/http'

import { AppComponent }  from './app.component'
import { routing }        from './app.routing'

import { ProfilesComponent }  from './profiles/profiles.component'

import { ProfileService } from './services/profile.service'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    ProfilesComponent,
  ],
  providers: [
    ProfileService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
