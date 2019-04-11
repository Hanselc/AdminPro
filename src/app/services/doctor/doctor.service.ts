import { Doctor } from './../../models/doctor.model';
import { WEBAPI_URL } from './../../config/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    private http: HttpClient,
    private _userService: UserService
  ) { }

  loadDoctors() {
    let url = WEBAPI_URL + '/doctor';
    return this.http.get(url);
  }

  loadDoctor(id: string) {
    let url = WEBAPI_URL + '/doctor/' + id;
    return this.http.get(url).pipe(
      map((resp: any) => resp.doctor)
    );
  }

  searchDoctor(term: string) {
    let url = WEBAPI_URL + '/search/collection/doctor/' + term;
    return this.http.get(url).pipe(map((resp: any) => resp.doctor));
  }

  deleteDoctor(id: string) {
    let url = WEBAPI_URL + '/doctor/' + id + '?token=' + this._userService.token;
    return this.http.delete(url);
  }

  createDoctor(doctor: Doctor) {
    let url = WEBAPI_URL + '/doctor?token=' + this._userService.token;
    return this.http.post(url, doctor);
  }

  updateDoctor(doctor: Doctor) {
    let url = WEBAPI_URL + '/doctor/' + doctor._id + '?token=' + this._userService.token;
    return this.http.put(url, doctor);
  }
}
