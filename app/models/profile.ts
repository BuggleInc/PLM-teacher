export class Profile {
  _id: string
  fullName: string
  email: string
  gitID: string
  created: Date
  lastProgLang: string

  static fromJSON(json: ProfileJSON): Profile {
    let profile = Object.create(Profile.prototype)
    return Object.assign(profile, json, {
      created: new Date(json.created),
    })
  }

}

export class ProfileJSON {
  _id: string
  fullName: string
  email: string
  gitID: string
  created: string
  lastProgLang: string
}
