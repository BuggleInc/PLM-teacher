import { Injectable } from '@angular/core'
import { Headers, Http, Response } from '@angular/http'

import { Profile } from '../models/profile'
import { PROFILES } from '../mocks/mock-profiles'

import { Session } from '../models/session'
import { SessionService } from './session.service'

@Injectable()
export class ProfileService {
  private profilesUrl = 'app/heroes'  // URL to web api

  profiles: Profile[] = []

  constructor(private http: Http, private sessionService: SessionService) {
    this.init()
  }

  init(): void {
    // Retrieve profiles from webservice
    this.retrieveProfiles()
      .then(profiles => {
        this.profiles = profiles
        for(let profile of this.profiles) {
          this.computeAttendance(profile)
        }
      })
      .catch(err => console.error(err))
  }

  computeAttendance(profile: Profile): void {
    let sessions = this.sessionService.getSessions()
    for(let session of sessions) {
      if(session.isOver()) {
        // TODO: Compute branchName according to profile.gitID
        let branchName: string = 'PLM135133026701cb4c442ee940a8cd465c3997e148'
        let url: string = `https://api.github.com/repos/buggleinc/plm-data/commits?sha=${branchName}&since=${session.from.toISOString()}&until=${session.to.toISOString()}`

        this.http.get(url)
          .toPromise()
          .then(response => {
            let commits = response.json()
            profile.attendance[session.id] = commits.length > 0
          })
          .catch(err => console.error(err))
      }
    }
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
