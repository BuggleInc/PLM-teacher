import { Routes, RouterModule } from '@angular/router'

import { DashboardComponent } from './dashboard/dashboard.component'

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }, {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'prefix'
  }
]

export const routing = RouterModule.forRoot(appRoutes);
