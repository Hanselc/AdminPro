import { ModalUploadService } from './../../services/upload-file/modal-upload.service';
import { User } from './../../models/user.model';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';

import swal from 'sweetalert';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  from: number = 0;
  total: number = 0;
  loading: boolean = false;

  constructor(private _userService: UserService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.loadUsers();
    this._modalUploadService.notification.subscribe(resp => {
    this.loadUsers();
    });
  }

  loadUsers() {
    this.loading = true;
    this._userService.loadUsers(this.from).subscribe((resp: any) => {
      this.total = resp.total;
      this.users = resp.users;
      this.loading = false;
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

  showModal(id: string) {
    this._modalUploadService.showModal(id, 'users');
  }

  searchUser(term: string) {
    if (term.length === 0) {
      this.loadUsers();
      return;
    }
    this.loading = true;
    this._userService.searchUser(term).subscribe((users) => {
      this.users = users;
      this.loading = false;
    });
  }

  deleteUser(user: User) {
    if (user._id === this._userService.user._id) {
      swal('Error!', 'No puede borrar su propio usuario', 'error');
      return;
    }

    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar ' + user.name,
      icon: 'warning',
      buttons: {
        cancel: { visible: true, text: 'Cancelar' },
        confirm: { visible: true, text: 'Confirmar' },
      },
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._userService.deleteUser(user._id).subscribe((resp) => {
          this.loadUsers();
          swal('Usuario borrado', 'Usuario eliminado exitosamente', 'success');
        });
      }
    });
  }

  saveUser(user: User) {
    this.loading = true;
    this._userService.updateUser(user).subscribe(resp => {
      this.loading = false;
      swal('Usuario actualizado', user.name, 'success');
    });
  }
}
