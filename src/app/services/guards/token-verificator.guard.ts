import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenVerificatorGuard implements CanActivate {

  constructor(
    private _userService: UserService
  ) { }

  canActivate(): Promise<boolean> | boolean {
    let token = this._userService.token;
    let payload = JSON.parse(atob(token.split('.')[1]));

    let expired = this.expired(payload.exp);

    if (expired) {
      return false;
    }

    return this.needRenew(payload.exp);
  }

  needRenew(expDate: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let tokenExp = new Date(expDate * 1000);
      let now = new Date();

      now.setTime(now.getTime() + (1 * 60 * 60 * 1000));

      if (tokenExp.getTime() > now.getTime()) {
        resolve(true);
      } else {
        this._userService.renewToken().subscribe(() => {
          resolve(true);
        }, () => {
          reject(false);
        });
      }

      resolve(true);
    });
  }

  expired(expDate: number) {
    let now = new Date().getTime() / 1000;
    if (expDate < now) {
      return true;
    } else {
      return false;
    }
  }
}
