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
  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.user = this._userService.user;
  }

  logout() {
    this._userService.logout();
  }
}
