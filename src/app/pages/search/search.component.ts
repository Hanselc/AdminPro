import { WEBAPI_URL } from './../../config/config';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Hospital } from '../../models/hospital.model';
import { User } from '../../models/user.model';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {
  hospitals: Hospital[] = [];
  users: User[] = [];
  doctors: Doctor[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {
    _activatedRoute.params.subscribe( params => {
      this.search(params.term);
    });
  }

  ngOnInit() {
  }

  search(term: string) {
    let url = WEBAPI_URL + '/search/all/' + term;
    this.http.get(url).subscribe((resp: any) => {
      this.hospitals = resp.hospitals;
      this.users = resp.users;
      this.doctors = resp.doctors;
    });
  }
}
