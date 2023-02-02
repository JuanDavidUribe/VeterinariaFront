import { Component, OnInit } from '@angular/core';
import { faCircleInfo, faPerson, faMagnifyingGlass, faPlus, faBroom, faCheck, faXmark, faPencil } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  addOwnerObject : Owner = {
    id : 0,
    name : '',
    typeId : '',
    city : '',
    address: '',
    cellphone : ''
  }

  constructor(
    private ownerService: OwnerService,
    private modal: NgbModal
  ) { }

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

  addOwner (addOwnerModal: any) {
    this.modal.open(addOwnerModal,{centered: true});
  }

  closeModal () {
    this.addOwnerObject = {
      id: 0,
      name: '',
      typeId: '',
      city: '',
      address: '',
      cellphone: ''
    }
    this.modal.dismissAll();
  }

  confirmAdd () {
    this.ownerService.addOwner(this.addOwnerObject).subscribe();
    this.search();
    this.closeModal();
  }
}
