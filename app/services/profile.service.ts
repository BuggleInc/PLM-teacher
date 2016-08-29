import { Injectable } from '@angular/core'
import { Headers, Http, Response } from '@angular/http'

import { Profile } from '../models/profile'
import { PROFILES } from '../mocks/mock-profiles'

@Injectable()
export class ProfileService {
  private profilesUrl = 'app/heroes'  // URL to web api

  constructor(private http: Http) { }

  getProfiles(): Promise<Profile[]> {
    return Promise.resolve(PROFILES.map(Profile.fromJSON))
  }

  getProfile(id: string): Promise<Profile> {
    return this.getProfiles()
      .then(profiles => profiles.find(profile => profile._id === id))
  }
}
