import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/service.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(private _userService: UserService) { }

  ngOnInit() {
  }

  logout() {
    this._userService.logout();
  }
}
