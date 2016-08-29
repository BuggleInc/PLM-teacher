import { Injectable } from '@angular/core'

import { Session } from '../models/session'
import { SESSIONS } from '../mocks/mock-sessions'

@Injectable()
export class SessionService {

  constructor() { }

  getSessions(): Promise<Session[]> {
    return Promise.resolve(SESSIONS.map(Session.fromJSON))
  }

  getSession(date: Date): Promise<Session> {
    return this.getSessions()
      .then(sessions => sessions.find(session => session.from < date && date < session.to))
  }
}
