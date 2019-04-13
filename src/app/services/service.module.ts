import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AdminGuard,
  LoginGuard,
  SettingsService,
  SidebarService,
  SharedService,
  UserService,
  HospitalService,
  DoctorService,
  UploadFileService,
  ModalUploadService } from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    AdminGuard,
    LoginGuard,
    SettingsService,
    SidebarService,
    SharedService,
    UserService,
    HospitalService,
    DoctorService,
    UploadFileService,
    ModalUploadService,


  ],
})
export class ServiceModule { }
