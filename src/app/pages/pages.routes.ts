import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../services/service.index';

import { PagesComponent } from './pages.component';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graphs1Component } from './graphs1/graphs1.component';
import { ProgressPageComponent } from './progress-page/progress-page.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [ LoginGuard ],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'progress-page', component: ProgressPageComponent, data: { title: 'Progress' }  },
      { path: 'graphs1', component: Graphs1Component, data: { title: 'Graphs' }  },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Themes' }  },
      { path: 'profile', component: ProfileComponent, data: { title: 'Profile' }  },
      { path: 'promises', component: PromisesComponent, data: { title: 'Promises' }  },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' }  },

      { path: 'users', component: UsersComponent, data: { title: 'User Configurations' }  },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
    ]
  },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
