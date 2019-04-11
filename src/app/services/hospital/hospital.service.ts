import { Hospital } from './../../models/hospital.model';
import { Injectable } from '@angular/core';
import { WEBAPI_URL } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    private http: HttpClient,
    private _userService: UserService
    ) {}

  loadHospitals() {
    let url = WEBAPI_URL + '/hospital';
    return this.http.get(url);
  }

  getHospital(id: string) {
    let url = WEBAPI_URL + '/hospital/' + id;
    return this.http.get(url);
  }

  deleteHospital(id: string) {
    let url = WEBAPI_URL + '/hospital/' + id + '?token=' + this._userService.token;
    return this.http.delete(url);
  }

  createHospital(name: string) {
    let url = WEBAPI_URL + '/hospital?token=' + this._userService.token;
    let hospital = new Hospital(name);
    return this.http.post(url, hospital);
  }

  searchHospital(term: string) {
    let url = WEBAPI_URL + '/search/collection/hospital/' + term;
    return this.http.get(url).pipe(map((resp: any) => resp.hospital));
  }

  updateHospital(hospital: Hospital) {
    let url = WEBAPI_URL + '/hospital/' + hospital._id + '?token=' + this._userService.token;
    return this.http.put(url, hospital);
  }
}
