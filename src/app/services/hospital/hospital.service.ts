import { Hospital } from './../../models/hospital.model';
import { Injectable } from '@angular/core';
import { WEBAPI_URL } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  token: string;

  constructor(private http: HttpClient) {
    this.loadStorage();
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }
  }

  loadHospitals() {
    let url = WEBAPI_URL + '/hospital';
    return this.http.get(url);
  }

  getHospital(id: string) {
    let url = WEBAPI_URL + '/hospital/' + id;
    return this.http.get(url);
  }

  deleteHospital(id: string) {
    let url = WEBAPI_URL + '/hospital/' + id + '?token=' + this.token;
    return this.http.delete(url);
  }

  createHospital(name: string) {
    let url = WEBAPI_URL + '/hospital?token=' + this.token;
    let hospital = new Hospital(name);
    return this.http.post(url, hospital);
  }

  searchHospital(term: string) {
    let url = WEBAPI_URL + '/search/collection/hospital/' + term;
    return this.http.get(url).pipe(map((resp: any) => resp.hospital));
  }

  updateHospital(hospital: Hospital) {
    let url = WEBAPI_URL + '/hospital/' + hospital._id + '?token=' + this.token;
    return this.http.put(url, hospital);
  }
}
