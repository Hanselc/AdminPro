import { Hospital } from './../../models/hospital.model';
import { Component, OnInit } from '@angular/core';
import { HospitalService, ModalUploadService } from 'src/app/services/service.index';

import swal from 'sweetalert';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {

  hospitals: Hospital[] = [];
  total: number = 0;
  loading: boolean = false;

  constructor(private _hospitalService: HospitalService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.loadHospitals();
    this._modalUploadService.notification.subscribe(resp => {
      this.loadHospitals();
    });
  }

  loadHospitals() {
    this.loading = true;
    this._hospitalService.loadHospitals().subscribe((resp: any) => {
      this.total = resp.total;
      this.hospitals = resp.hospitals;
      this.loading = false;
    });
  }

  showModal(id: string) {
    this._modalUploadService.showModal(id, 'hospitals');
  }

  searchHospital(term: string) {
    if (term.length === 0) {
      this.loadHospitals();
      return;
    }
    this.loading = true;
    this._hospitalService.searchHospital(term).subscribe((hospitals) => {
      this.hospitals = hospitals;
      this.loading = false;
    });
  }

  deleteHospital(hospital: Hospital) {
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar ' + hospital.name,
      icon: 'warning',
      buttons: {
        cancel: { visible: true, text: 'Cancelar' },
        confirm: { visible: true, text: 'Confirmar' },
      },
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._hospitalService.deleteHospital(hospital._id).subscribe((resp) => {
          this.loadHospitals();
          swal('Hospital borrado', 'Hospital eliminado exitosamente', 'success');
        });
      }
    });
  }

  saveHospital(hospital: Hospital) {
    this.loading = true;
    this._hospitalService.updateHospital(hospital).subscribe(resp => {
      this.loading = false;
      swal('Hospital actualizado', hospital.name, 'success');
    });
  }

  createHospital() {
    swal({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      content: { element: 'input' }
    })
    .then((value) => {
      this.loading = true;
      this._hospitalService.createHospital(value).subscribe(resp => {
        this.loading = false;
        this.loadHospitals();
        swal('Hospital creado!', value, 'success');
      });
    });
  }
}
