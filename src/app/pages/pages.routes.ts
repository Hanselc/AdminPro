
import { RouterModule, Routes } from '@angular/router';
import { RxjsComponent } from './rxjs/rxjs.component';

import { AdminGuard, TokenVerificatorGuard } from '../services/service.index';

import { PagesComponent } from './pages.component';
import { UsersComponent } from './users/users.component';
import { SearchComponent } from './search/search.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graphs1Component } from './graphs1/graphs1.component';
import { ProgressPageComponent } from './progress-page/progress-page.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { ProfileComponent } from './profile/profile.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorComponent } from './doctors/doctor.component';
import { DoctorsComponent } from './doctors/doctors.component';

const pagesRoutes: Routes = [
    {
      path: 'dashboard',
      component: DashboardComponent,
      data: { title: 'Dashboard' },
      canActivate: [TokenVerificatorGuard],
    },
    { path: 'progress-page', component: ProgressPageComponent, data: { title: 'Progress' }  },
    { path: 'graphs1', component: Graphs1Component, data: { title: 'Graphs' }  },
    { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Themes' }  },
    { path: 'profile', component: ProfileComponent, data: { title: 'Profile' }  },
    { path: 'promises', component: PromisesComponent, data: { title: 'Promises' }  },
    { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' }  },
    { path: 'search/:term', component: SearchComponent, data: { title: 'Search' }  },
    {
      path: 'users',
      component: UsersComponent,
      canActivate: [AdminGuard],
      data: { title: 'User Configurations' }
    },
    { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospital Configurations' }  },
    { path: 'doctors', component: DoctorsComponent, data: { title: 'Doctor Configurations' }  },
    { path: 'doctor/:id', component: DoctorComponent, data: { title: 'Update Doctor' }  },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
  ];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
