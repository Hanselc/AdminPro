import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SettingsService,
  SidebarService,
  SharedService,
  UserService,
  UploadFileService } from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UserService,
    UploadFileService
  ],
})
export class ServiceModule { }
