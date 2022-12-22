import { Component, OnInit } from '@angular/core';
import { faCircleInfo, faPerson, faMagnifyingGlass, faPlus, faBroom, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Patient } from '../interfaces/patient';
import { PatientService } from '../services/patient.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Specie } from '../interfaces/specie';
import { Breed } from '../interfaces/breed';
import { SpecieService } from '../services/specie.service';
import { BreedService } from '../services/breed.service';

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
  faCheck =faCheck;
  faXmark =faXmark;

  txtSearch = '';

  patients : Array<Patient> = new Array();

  Species : Array<Specie> = new Array();
  speciePatient : number = 0;

  Breeds : Array<Breed> = new Array();

  addPatientObject : Patient = {
    id : 0,
    patientName : '',
    birth : '',
    breedId : 0,
  }

  constructor(
    private patientService : PatientService,
    private specieService : SpecieService,
    private breedService :  BreedService,
    private modal: NgbModal
  ) { }

  ngOnInit(): void {
    this.search();
    this.showSpecies();
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

  addPatient(addPatientModal:any) {
    this.modal.open(addPatientModal,{centered: true});

  }

  closeModal () {
    this.Breeds = new Array();
    this.Species = new Array();
    this.addPatientObject = {
      id : 0,
      patientName : '',
      birth : '',
      breedId : 0,
    }
    this.modal.dismissAll();
  }

  showSpecies () {
    this.specieService.listSpecies().subscribe(data => {
      this.Species = data;
    });
  }

  showBreeds() {
    this.breedService.listBreedsOfSpecie(this.speciePatient).subscribe(data => {
      this.Breeds = data;
    })
  }

  confirmAdd () {
    this.addPatientObject.breedId = parseInt(this.addPatientObject.breedId.toString());
    this.patientService.addPatient(this.addPatientObject).subscribe();
    this.modal.dismissAll();
    this.search();
  }
}
