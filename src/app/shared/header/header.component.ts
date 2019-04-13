import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/service.index';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`
    .dw-user-box{
      text-align: center;
    }
  `]
})
export class HeaderComponent implements OnInit {

  user: User;
  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
    this.user = this._userService.user;
  }

  logout() {
    this._userService.logout();
  }

  search(term: string) {
    this._router.navigate(['/search', term]);
  }
}
