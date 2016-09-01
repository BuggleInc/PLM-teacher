import { Injectable } from '@angular/core'
import { Headers, Http, Response } from '@angular/http'

import 'rxjs/add/operator/toPromise'

@Injectable()
export class GitHubAPIService {
  private owner = 'buggleinc'
  private repo = 'plm-data'
  private githubAPIURL = 'https://api.github.com'  // URL to web api

  private accessToken = 'put your secret here'
  private headers = new Headers({'Authorization': `token ${this.accessToken}`});

  constructor(private http: Http) {
    this.init()
  }

  init(): void {}

  getCommits(branchName: string, since: Date, until: Date): Promise<Response> {
    let url: string = `${this.githubAPIURL}/repos/${this.owner}/${this.repo}/commits?sha=${branchName}&since=${since.toISOString()}&until=${until.toISOString()}`

    return this.http.get(url, { headers: this.headers}).toPromise()
  }

  getContent(branchName: string): Promise<Response> {
    let url: string = `${this.githubAPIURL}/repos/${this.owner}/${this.repo}/contents?ref=${branchName}`

    return this.http.get(url, { headers: this.headers}).toPromise()
  }
}
