import { Component, OnInit } from '@angular/core';
import { faCircleInfo, faPerson, faMagnifyingGlass, faPlus, faBroom, faCheck, faXmark, faPencil } from '@fortawesome/free-solid-svg-icons';
import { Owner } from '../interfaces/owner';
import { OwnerService } from '../services/owner.service';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss']
})
export class OwnersComponent implements OnInit {

  faCircle = faCircleInfo;
  faPerson = faPerson;
  faMagnifyingGlass = faMagnifyingGlass;
  faPlus =faPlus;
  faBroom = faBroom;
  faCheck =faCheck;
  faXmark =faXmark;
  faPencil = faPencil;

  txtSearch = '';

  owners : Array<Owner> = new Array();

  constructor(private ownerService : OwnerService) { }

  ngOnInit(): void {
    this.search();
  }

  search () {
    if(this.txtSearch == ''){
      this.ownerService.list().subscribe(data => {
        this.owners = data;
      });
    } else {
      this.ownerService.listWithName(this.txtSearch).subscribe(data => {
        this.owners = data;
      });
    }
  }

  clean() {
    this.txtSearch = '';
    this.search();
  }

  addOwner () {

  }

}
