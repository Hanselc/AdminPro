import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Routes
import { PAGES_ROUTES } from './pages.routes';

// Modules
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressPageComponent } from './progress-page/progress-page.component';
import { Graphs1Component } from './graphs1/graphs1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from '../components/progress/progress.component';
import { ChartsModule } from 'ng2-charts';
import { GraphsComponent } from '../components/graphs/graphs.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ChartsModule,
    CommonModule,
    PAGES_ROUTES
  ],
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressPageComponent,
    Graphs1Component,
    ProgressComponent,
    GraphsComponent,
    AccountSettingsComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressPageComponent,
    Graphs1Component
  ]
})
export class PagesModule { }
