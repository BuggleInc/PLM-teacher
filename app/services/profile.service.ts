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
        }
      })
      .catch(err => console.error(err))
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
