import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { WEBAPI_URL } from 'src/app/config/config';
import { User } from 'src/app/models/user.model';
import { UploadFileService } from './../upload-file/upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  token: string;

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
        return true;
      })
    );
  }

  createUser(user: User) {
    let url = WEBAPI_URL + '/user';
    return this.http.post(url, user);
  }

  updateUser(user: User) {
    let url = WEBAPI_URL + '/user/' + user._id + '?token=' + this.token;
    return this.http.put(url, user).pipe(
      map((resp: any) => {
        this.saveStorage(resp.user._id, this.token, resp.user);
        return true;
      })
    );
  }

  changeImage(file: File, userId: string) {
    return this._uploadFileService.uploadFile(file, 'users', userId)
    .then((resp: any) => {
      console.log(resp);
      this.user.image = resp.user.image;
      this.saveStorage(userId, this.token, this.user);
      return resp;
    }).catch((resp) => {
      console.log('error ' + resp);
    });
  }

  loadUsers(from: number = 0) {
    let url = WEBAPI_URL + '/user?from=' + from;
    return this.http.get(url);
  }
}
