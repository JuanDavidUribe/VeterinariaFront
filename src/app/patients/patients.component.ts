import { Component, OnInit } from '@angular/core';
import { faCircleInfo, faPerson, faMagnifyingGlass, faPlus, faBroom } from '@fortawesome/free-solid-svg-icons';
import { Patient } from '../interfaces/patient';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  faCircle = faCircleInfo;
  faPerson = faPerson;
  faMagnifyingGlass = faMagnifyingGlass;
  faPlus =faPlus;
  faBroom = faBroom;

  txtSearch = '';

  patients : Array<Patient> = new Array();

  constructor(private patientService : PatientService) { }

  ngOnInit(): void {
    this.search();
  }

  clean () {
    this.txtSearch = '';
    this.search();
  }

  search () {
    if(this.txtSearch == ''){
      this.patientService.list().subscribe(data => {
        this.patients = data;
        this.razaEspecie();
      });
    } else {
      this.patientService.listWithName(this.txtSearch).subscribe(data => {
        this.patients = data;
        this.razaEspecie()
      });
    }
  }


  razaEspecie () {
    this.patients.forEach(Patient => {
      this.patientService.breed(Patient.breedId).subscribe(data => {
        Patient.breedName = data.breedName;
      });

      this.patientService.specie(Patient.breedId).subscribe(data => {
        Patient.specieName = data.specieName;
      });
    });
  }
}
