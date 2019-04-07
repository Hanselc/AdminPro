import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/service.index';

import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;
  imageToUpload: File;
  tempImage: string;

  constructor(private _userService: UserService) {
    this.user = _userService.user;
  }

  ngOnInit() {
  }

  save(user: User) {
    this.user.name = user.name;
    if (!this.user.google) {
      this.user.email = user.email;
    }
    this._userService.updateUser(this.user).subscribe(resp => {
      swal('Usuario actualizado', user.name, 'success');
    });
  }

  imageSelection(file: File) {
    if (!file) {
      this.imageToUpload = null;
      return;
    }

    if (file.type.indexOf('image') < 0) {
      this.imageToUpload = null;
      swal('Solo Imagenes!', 'El archivo seleccionado no es una imagen', 'error');
      return;
    }

    this.imageToUpload = file;

    let reader = new FileReader();
    reader.onloadend = () => this.tempImage = reader.result.toString();
    reader.readAsDataURL(file);
  }

  changeImage() {
    this._userService.changeImage(this.imageToUpload, this.user._id).then(resp => {
      swal('Usuario actualizado', this.user.name, 'success');
    });
  }
}
