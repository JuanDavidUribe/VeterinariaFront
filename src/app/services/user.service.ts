import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  loginUrl = "http://localhost:8080/api/user/login";

  constructor(private Http: HttpClient) { }

  login(user: User):Observable<User> {
    return this.Http.post<User>(`${this.loginUrl}`, user);
  }

}
