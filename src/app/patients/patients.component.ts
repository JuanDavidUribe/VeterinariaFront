import { Component, OnInit } from '@angular/core';
import { faCircleInfo, faPerson, faMagnifyingGlass, faPlus, faBroom, faCheck, faXmark, faPencil } from '@fortawesome/free-solid-svg-icons';
import { Patient } from '../interfaces/patient';
import { PatientService } from '../services/patient.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Specie } from '../interfaces/specie';
import { Breed } from '../interfaces/breed';
import { SpecieService } from '../services/specie.service';
import { BreedService } from '../services/breed.service';
import { Owner } from '../interfaces/owner';
import { OwnerService } from '../services/owner.service';

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
  faPencil = faPencil;

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

  patientInfoOwner : Patient = {
    id : 0,
    patientName : '',
    birth : '',
    breedId : 0,
  }

  owners : Array<Owner> = new Array();
  ownersToPatient : Array<Owner> = new Array();
  idOwner: number = 0;

  constructor(
    private patientService : PatientService,
    private specieService : SpecieService,
    private breedService :  BreedService,
    private ownerService : OwnerService,
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

  ownerInfo (OwnerInfo:any, patient:Patient) {
    this.patientInfoOwner = patient;
    this.modal.open(OwnerInfo,{centered: true});
    this.ownerService.getOwnersByPatient(patient.id).subscribe(data =>{
      this.owners = data;
    })
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
    this.patientService.addPatient(this.addPatientObject).subscribe(() => {
      this.search();
    });
    this.modal.dismissAll();
  }

  addOwnerToPatient (addOwnerToPatientModal : any) {
    this.modal.open(addOwnerToPatientModal);
    this.ownerService.list().subscribe(data => {
      this.ownersToPatient = data;
    });
  }

  confirmAddOwnerToPatient () {
    this.ownerService.addOwnerToPatient(this.idOwner, this.patientInfoOwner.id).subscribe();
    window.location.reload();
  }

  deleteOwner(owner : Owner){
    this.ownerService.deleteOwnerFromPatient(owner, this.patientInfoOwner).subscribe();
    window.location.reload();
  }
}
