import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { WEBAPI_URL } from 'src/app/config/config';
import { User } from 'src/app/models/user.model';
import { UploadFileService } from './../upload-file/upload-file.service';

import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  token: string;
  menu: any = [];

  constructor(public http: HttpClient, private _router: Router, private _uploadFileService: UploadFileService) {
    this.loadStorage();
  }

  isLogged(): boolean {
    return this.token && this.token.length > 1;
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = null;
      this.user = null;
      this.menu = [];
    }
  }

  saveStorage(id: string, token: string, user: User, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.user = user;
    this.token = token;
    this.menu = menu;
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
        this.saveStorage(resp.id, resp.token, resp.user, resp.menu);
        return true;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  logout() {
    this.user = null;
    this.token = null;
    this.menu = [];
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');
    this._router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    let url = WEBAPI_URL + '/login/google';
    return this.http.post(url, { token: token }).pipe(
      map((resp: any) => {
        this.saveStorage(resp.id, resp.token, resp.user, resp.menu);
        return true;
      })
    );
  }

  createUser(user: User) {
    let url = WEBAPI_URL + '/user';
    return this.http.post(url, user).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  updateUser(user: User) {
    let url = WEBAPI_URL + '/user/' + user._id + '?token=' + this.token;
    return this.http.put(url, user).pipe(
      map((resp: any) => {
        if (user._id === this.user._id) {
          this.saveStorage(resp.user._id, this.token, resp.user, this.menu);
        }
        return true;
      })
    );
  }

  changeImage(file: File, userId: string) {
    return this._uploadFileService.uploadFile(file, 'users', userId)
    .then((resp: any) => {
      this.user.image = resp.user.image;
      this.saveStorage(userId, this.token, this.user, this.menu);
      return resp;
    }).catch((resp) => {
      console.log('error ' + resp);
    });
  }

  loadUsers(from: number = 0) {
    let url = WEBAPI_URL + '/user?from=' + from;
    return this.http.get(url);
  }

  searchUser(term: string) {
    let url = WEBAPI_URL + '/search/collection/user/' + term;
    return this.http.get(url).pipe(map((resp: any) => resp.user));
  }

  deleteUser(id: string) {
    let url = WEBAPI_URL + '/user/' + id + '?token=' + this.token;
    return this.http.delete(url);
  }
}
