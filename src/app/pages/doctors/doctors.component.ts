import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor/doctor.service';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit {

  doctors: Doctor[] = [];
  total: number = 0;
  loading: boolean = false;

  constructor(
    private _doctorService: DoctorService
  ) { }

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
      this.loading = true;
      this._doctorService.loadDoctors().subscribe((resp: any) => {
        this.total = resp.total;
        this.doctors = resp.doctors;
        this.loading = false;
      });
  }

  searchDoctor(term: string) {
    if (term.length === 0) {
      this.loadDoctors();
      return;
    }
    this.loading = true;
    this._doctorService.searchDoctor(term).subscribe((doctors) => {
      this.doctors = doctors;
      this.loading = false;
    });
  }

  deleteHospital(doctor: Doctor) {
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar ' + doctor.name,
      icon: 'warning',
      buttons: {
        cancel: { visible: true, text: 'Cancelar' },
        confirm: { visible: true, text: 'Confirmar' },
      },
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._doctorService.deleteDoctor(doctor._id).subscribe((resp) => {
          this.loadDoctors();
          swal('Doctor borrado', 'Doctor eliminado exitosamente', 'success');
        });
      }
    });
  }
}
