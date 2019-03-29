import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private _userService: UserService, private _router: Router) {}

  canActivate(): boolean {
    if (this._userService.isLogged()){
      return true;
    }
    this._router.navigate(['/login']);
    return false;
  }
}
