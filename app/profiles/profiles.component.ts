import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { Profile } from '../models/profile'
import { ProfileService } from '../services/profile.service'

@Component({
  selector: 'profiles',
  templateUrl: 'app/profiles/profiles.component.html',
  styleUrls: ['app/profiles/profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  constructor(private router: Router, private profileService: ProfileService) { }

  profiles: Profile[]
  selectedProfile: Profile

  ngOnInit(): void {
    this.getProfiles()
      .then(profiles => this.profiles = profiles)
      .catch(err => console.error(err))
  }

  getProfiles(): Promise<Profile[]> {
    return this.profileService.getProfiles()
  }

  onSelect(profile: Profile): void {
    this.selectedProfile = profile
  }

  gotoDetail(): void {
    this.router.navigate(['/profiles', this.selectedProfile._id]);
  }
}
