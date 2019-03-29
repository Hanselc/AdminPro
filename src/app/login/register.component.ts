import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../services/service.index';
import { User } from '../models/user.model';

import swal from 'sweetalert';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  constructor(public _userService: UserService, public router: Router) { }

  ngOnInit() {
    init_plugins();

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      conditions: new FormControl(false)
    }, { validators: this.checkEq('password', 'password2') });

    this.callDummyData();
  }

  loginUser() {
    if (this.form.invalid) {
      return;
    }

    if (!this.form.value.conditions){
      swal('Accept terms', 'You must accept terms and conditions.', 'warning');
      return;
    }

    let user = new User(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password
    );

    this._userService.createUser(user).subscribe(resp => {
      swal('User Created', user.email, 'success');
      this.router.navigate(['/login']);
    });
  }

  checkEq(field1: string, field2: string) {
    return (group: FormGroup) => {
      let pass1 = group.controls[field1].value;
      let pass2 = group.controls[field2].value;
      if (pass1 === pass2) {
        return null;
      }
      return {
        notEqual: true
      };
    }
  }

  callDummyData() {
    this.form.setValue({
      name: 'hansel',
      email: 'email@test.com',
      password: '123456',
      password2: '123456',
      conditions: true
    });
  }
}
