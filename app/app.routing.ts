import { Routes, RouterModule } from '@angular/router'

import { ProfilesComponent } from './profiles/profiles.component'

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/profiles',
    pathMatch: 'full'
  }, {
    path: 'profiles',
    component: ProfilesComponent
  },
  {
    path: '',
    redirectTo: '/profiles',
    pathMatch: 'prefix'
  }
]

export const routing = RouterModule.forRoot(appRoutes);
