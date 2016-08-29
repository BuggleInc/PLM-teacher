export class Session {
  from: Date
  to: Date

  // fromJSON is used to convert an serialized version
  // of the Session to an instance of the class
  static fromJSON(json: SessionJSON): Session {
    // create an instance of the User class
    let session = Object.create(Session.prototype)
    // copy all the fields from the json object
    return Object.assign(session, json, {
      // convert fields that need converting
      from: new Date(json.from),
      to: new Date(json.to),
    })
  }
}

// A representation of Session's data that can be converted to
// and from JSON without being altered.
export class SessionJSON {
  from: string
  to: string
}
