import { UserService } from './../../services/user/user.service';
import { User } from 'src/app/models/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  from: number = 0;
  total: number = 0;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this._userService.loadUsers(this.from).subscribe((resp: any) => {
      this.total = resp.total;
      this.users = resp.users;
    });
  }

  loadFrom(value: number) {
    let from = this.from + value;
    if (from >= this.total || from < 0) {
      return;
    }
    this.from = from;
    this.loadUsers();
  }
}
