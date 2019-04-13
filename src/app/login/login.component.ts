import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../services/service.index';
import { DOCUMENT } from '@angular/common';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public rememberMe: boolean = false;
  public email: string;

  auth2: any;

  constructor(public router: Router, private _userService: UserService, @Inject(DOCUMENT) private _document, private _zone: NgZone) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.rememberMe = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '673315815440-d37ku8vghnhi51u5sdq1ru1uka7oviia.apps.googleusercontent.com',
        cookiePolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSigin(this._document.getElementById('btnGoogle'));
    });
  }

  attachSigin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      let token = googleUser.getAuthResponse().id_token;
      this._zone.run(() => {
        this._userService.loginGoogle(token).subscribe(() => this.router.navigate(['/dashboard']));
      });
    });
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    let user = new User(null, form.value.email, form.value.password);
    this._userService.login(user, this.rememberMe).subscribe(() => this.router.navigate(['/dashboard']), err => {
      swal('Error', err.error.message, 'error');
    });
  }

}
