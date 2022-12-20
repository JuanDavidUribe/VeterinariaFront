import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { faDog, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user : User = {
    id : 0,
    name : '',
    password : '',
    userName: ''
  }

  activeLinks = false;

  faDog = faDog;
  faRightFromBracket = faRightFromBracket;

  constructor(private userService : UserService, private router:Router) { }

  ngOnInit(): void {
    this.verifyUser();
  }

  verifyUser(){
    this.user.id = localStorage['id'];
    if (this.user.id == undefined) {
      this.router.navigate(['login']);
    }
    this.userService.verifyById(this.user.id).subscribe(data =>{
      if (data == null) {
        this.router.navigate(['login']);
      } else {
        this.user = data;
      }
    })
  }

  logOut () {
    localStorage['id'] = 0;
    this.router.navigate(['login']);
  }

  openLinks() {
    if(this.activeLinks == false) {
      this.activeLinks = true;
    } else {
      this.activeLinks = false;
    }
  }

}
