import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { WEBAPI_URL } from 'src/app/config/config';
import { map } from 'rxjs/operators';

import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  token: string;

  constructor(public http: HttpClient, private _router: Router) {
    this.loadStorage();
  }

  isLogged(): boolean {
    return this.token && this.token.length > 1;
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = null;
      this.user = null;
    }
  }

  saveStorage(id: string, token: string, user: User) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.user = user;
    this.token = token;
  }

  login(user: User, remember: boolean = false) {
    if (remember) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = WEBAPI_URL + '/login';
    return this.http.post(url, user).pipe(
      map((resp: any) => {
        this.saveStorage(resp.id, resp.token, resp.user);
        return true;
      })
    );
  }

  logout() {
    this.user = null;
    this.token = null;
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    let url = WEBAPI_URL + '/login/google';
    return this.http.post(url, { token: token }).pipe(
      map((resp: any) => {
        this.saveStorage(resp.id, resp.token, resp.user);
        console.log(resp.user);
        return true;
      })
    );
  }

  createUser(user: User) {
    let url = WEBAPI_URL + '/user';
    return this.http.post(url, user);
  }
}
