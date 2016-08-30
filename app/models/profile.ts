export class Profile {
  _id: string
  fullName: string
  email: string
  gitID: string
  created: Date
  trackUser: boolean
  lastProgLang: string
  attendance: { [sessionID: number] : boolean }
  progression: { [exerciseID: string] : boolean }

  static fromJSON(json: ProfileJSON): Profile {
    let profile = Object.create(Profile.prototype)
    return Object.assign(profile, json, {
      created: new Date(json.created),
      attendance: {},
      progression: {},
    })
  }

}

export class ProfileJSON {
  _id: string
  fullName: string
  email: string
  gitID: string
  created: string
  trackUser: boolean
  lastProgLang: string
}
