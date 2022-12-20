import { Component, OnInit } from '@angular/core';
import { faCircleInfo, faPerson, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';

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
  constructor() { }

  ngOnInit(): void {
  }

}
