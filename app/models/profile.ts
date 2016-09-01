declare var jsSHA: any

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
  branchName: string

  static fromJSON(json: ProfileJSON): Profile {
    let profile = Object.create(Profile.prototype)
    let branchName = Profile.generateBranchName(json.gitID)

    return Object.assign(profile, json, {
      created: new Date(json.created),
      branchName: branchName,
      attendance: {},
      progression: {},
    })
  }

  static generateBranchName(gitID: string): string {
    const hash = new jsSHA('SHA-1', 'TEXT')
    hash.update(gitID)
    const plaintext = hash.getHash('HEX')
    return `PLM${plaintext}`
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
