import { Injectable } from '@angular/core'
import { Response } from '@angular/http'

import { Profile } from '../models/profile'
import { PROFILES } from '../mocks/mock-profiles'

import { Session } from '../models/session'
import { SessionService } from './session.service'

import { GitHubAPIService } from './github-api.service'

import 'rxjs/add/operator/toPromise'

@Injectable()
export class ProfileService {
  private profilesUrl = 'app/heroes'  // URL to web api

  private ready: boolean = false
  profiles: Profile[] = []

  constructor(private githubAPIService: GitHubAPIService, private sessionService: SessionService) {
    this.init()
  }

  init(): void {
    // Retrieve profiles from webservice
    this.retrieveProfiles()
      .then(profiles => {
        this.profiles = profiles
        this.refreshProfiles()
        this.ready = true
      })
      .catch(err => console.error(err))
  }

  computeAttendance(profile: Profile): void {
    let sessions = this.sessionService.getSessions()
    for(let session of sessions) {
      if(session.isValid()) {
        this.githubAPIService.getCommits(profile.branchName, session.from, session.to)
          .then(response => {
            let commits = response.json()
            profile.attendance[session.id] = commits.length > 0
          })
          .catch(err => console.error(err))
      }
    }
  }

  computeProgression(profile: Profile): void {
    const regexp: RegExp = /^.+\.scala\.DONE$/
    const suffix: string = '.scala.DONE'

    this.githubAPIService.getContent(profile.branchName)
      .then(response => {
        let contents: Array<any> = response.json()
        // Only keep the exercises passed
        let exercisesPassed = contents.filter(content => content.name.match(regexp)).map(content => content.name.substring(0, content.name.length - suffix.length))
        for(let exercisePassed of exercisesPassed) {
          profile.progression[exercisePassed] = true
        }
        console.log('profile: ', profile)
      })
      .catch(err => console.error(err))
  }

  refreshProfiles(): void {
    for(let profile of this.profiles) {
      if(profile.trackUser) {
        this.computeAttendance(profile)
        this.computeProgression(profile)
      } else {
        console.log(`User ${profile.fullName} <${profile.email}> did not accept to publish her usage data on GitHub.`)
      }
    }
  }

  isReady(): boolean {
    return this.ready
  }

  retrieveProfiles(): Promise<Profile[]> {
    return Promise.resolve(PROFILES.map(Profile.fromJSON))
  }

  getProfiles(): Profile[] {
    return this.profiles
  }

  getProfile(id: string): Profile {
    return this.getProfiles().find(profile => profile._id === id)
  }
}
