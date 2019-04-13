import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RxjsComponent } from './rxjs/rxjs.component';

// Routes
import { PAGES_ROUTES } from './pages.routes';

// Modules
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { ChartsModule } from 'ng2-charts';

// Custom Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressPageComponent } from './progress-page/progress-page.component';
import { Graphs1Component } from './graphs1/graphs1.component';
import { ProgressComponent } from '../components/progress/progress.component';
import { GraphsComponent } from '../components/graphs/graphs.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ChartsModule,
    CommonModule,
    PipesModule,
    PAGES_ROUTES
  ],
  declarations: [
    DashboardComponent,
    ProgressPageComponent,
    Graphs1Component,
    ProgressComponent,
    GraphsComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
    UsersComponent,
    HospitalsComponent,
    DoctorsComponent,
    DoctorComponent,
    SearchComponent
  ],
  exports: [
    DashboardComponent,
    ProgressPageComponent,
    Graphs1Component
  ]
})
export class PagesModule { }
