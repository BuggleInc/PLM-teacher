import { Injectable } from '@angular/core'

import { Session } from '../models/session'
import { SESSIONS } from '../mocks/mock-sessions'

@Injectable()
export class SessionService {

  sessions: Session[] = []

  constructor() {
    this.init()
  }

  init(): void {
    this.retrieveSessions()
      .then(sessions => {
        this.sessions = sessions
      })
      .catch(err => console.error(err))
  }

  retrieveSessions(): Promise<Session[]> {
    return Promise.resolve(SESSIONS.map(Session.fromJSON))
  }

  getSessions(): Session[] {
    return this.sessions
  }

  getSession(date: Date): Session {
    return this.getSessions().find(session => session.from < date && date < session.to)
  }
}
