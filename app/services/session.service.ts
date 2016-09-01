import { Injectable } from '@angular/core'

import { Session } from '../models/session'
import { SESSIONS } from '../mocks/mock-sessions'

@Injectable()
export class SessionService {

  ready: boolean = false
  sessions: Session[] = []

  constructor() {
    this.init()
  }

  init(): void {
    this.retrieveSessions()
      .then(sessions => {
        this.sessions = sessions
        this.ready = true
      })
      .catch(err => console.error(err))
  }

  retrieveSessions(): Promise<Session[]> {
    return Promise.resolve(SESSIONS.map(Session.fromJSON))
  }

  isReady(): boolean {
    return this.ready
  }

  getSessions(): Session[] {
    return this.sessions
  }

  getSession(date: Date): Session {
    return this.getSessions().find(session => session.from < date && date < session.to)
  }

  getPreviousSessions(): Session[] {
    return this.getSessions().filter(session => session.isValid())
  }
}
