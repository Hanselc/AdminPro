import { Hospital } from './../../models/hospital.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DoctorService } from '../../services/doctor/doctor.service';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Doctor } from '../../models/doctor.model';
import { ModalUploadService } from '../../services/upload-file/modal-upload.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {
  doctor: Doctor = new Doctor('', '', '', '', '');
  hospitals: Hospital[];
  hospital: Hospital = new Hospital('');

  constructor(
    private _doctorService: DoctorService,
    private _hospitalService: HospitalService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _modalUploadService: ModalUploadService
  ) {
    _activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id !== 'new') {
        this.loadDoctor(id);
      }
    });
  }

  ngOnInit() {
    this._hospitalService
      .loadHospitals()
      .subscribe((resp: any) => (this.hospitals = resp.hospitals));
    this._modalUploadService.notification.subscribe(resp => {
      this.doctor.image = resp.doctor.image;
    });
  }

  loadDoctor(id: string) {
    this._doctorService.loadDoctor(id).subscribe(resp => {
      this.doctor = resp;
      this.doctor.hospital = resp.hospital._id;
      this.changeHospital(this.doctor.hospital);
    });
  }

  saveDoctor(f: NgForm) {
    if (f.valid) {
      if (!this.doctor._id) {
        this._doctorService.createDoctor(this.doctor).subscribe((resp: any) => {
          swal('Médico creado!', resp.doctor.name, 'success');
          this.doctor._id = resp.doctor._id;
          this._router.navigate(['/doctor', resp.doctor._id]);
        });
      } else {
        this._doctorService.updateDoctor(this.doctor).subscribe((resp: any) => {
          swal('Médico actualizado!', resp.doctor.name, 'success');
        });
      }
    }
  }

  changeHospital(id: string) {
    this._hospitalService.getHospital(id).subscribe((resp: any) => {
      this.hospital = resp.hospital;
    });
  }

  changeImage() {
    this._modalUploadService.showModal(this.doctor._id, 'doctors');
  }
}
