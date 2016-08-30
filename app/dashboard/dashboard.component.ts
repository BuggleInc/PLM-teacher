import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { Profile } from '../models/profile'
import { ProfileService } from '../services/profile.service'

import { Session } from '../models/session'
import { SessionService } from '../services/session.service'

@Component({
  selector: 'dashboard',
  templateUrl: 'app/dashboard/dashboard.component.html',
  styleUrls: ['app/dashboard/dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private profileService: ProfileService, private sessionService: SessionService) { }

  selectedProfile: Profile

  ngOnInit(): void {}

  getProfiles(): Profile[] {
    return this.profileService.getProfiles()
  }

  getSessions(): Session[] {
    return this.sessionService.getSessions()
  }

  onSelect(profile: Profile): void {
    this.selectedProfile = profile
  }

  gotoDetail(): void {
    this.router.navigate(['/profiles', this.selectedProfile._id]);
  }
}
