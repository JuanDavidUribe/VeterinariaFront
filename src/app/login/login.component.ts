import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faUser = faUser;
  faLock = faLock;

  user : User = {
    id : 0,
    name : '',
    password : '',
    userName: ''
  }

  constructor(private userService: UserService, private router:Router) { }

  login (user: User) {
    this.userService.login(user).subscribe(data => {
      if (data != null) {
        this.user = data;
        localStorage['id'] = this.user.id;
        this.router.navigate(['home/patients']);
      } else {
        alert('usuario o contraseña no validos');
      }
    })
  }



  ngOnInit(): void {
  }

}
