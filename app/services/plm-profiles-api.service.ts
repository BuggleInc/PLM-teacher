import { Injectable } from '@angular/core'
import { Headers, Http, Response } from '@angular/http'

import 'rxjs/add/operator/toPromise'

@Injectable()
export class PLMProfilesAPIService {
  private apiKey = 'put your key here'
  private apiSecret = 'put your secret here'
  private plmProfilesAPIURL = 'http://plm.telecomnancy.univ-lorraine.fr:8080/api/profiles'  // URL to web api

  constructor(private http: Http) {
    this.init()
  }

  init(): void {}

  getProfiles(since: Date, until: Date): Promise<Response> {
    let url: string = `${this.plmProfilesAPIURL}?username=${this.apiKey}&password=${this.apiSecret}&since=${since.toISOString()}&until=${until.toISOString()}`

    return this.http.get(url).toPromise()
  }
}
