import { ModalUploadService } from './../../services/upload-file/modal-upload.service';
import { Component, OnInit } from '@angular/core';
import { UploadFileService } from './../../services/upload-file/upload-file.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imageToUpload: File;
  tempImage: string;

  constructor(private _uploadFileService: UploadFileService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
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

  closeModal() {
    this.imageToUpload = null;
    this.tempImage = null;

    this._modalUploadService.hideModal();
  }

  uploadImage() {
    this._uploadFileService.uploadFile(this.imageToUpload, this._modalUploadService.type, this._modalUploadService.id)
    .then(resp => {
      this._modalUploadService.notification.emit(resp);
      this.closeModal();
    }).catch(err => {
      console.log(err);
    });
  }

}
