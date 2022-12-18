import { Component, OnInit } from '@angular/core';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faUser = faUser;
  faLock = faLock;

  response = '';

  user : any = {
    id : 0,
    name : '',
    password : '',
    userName: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

}
