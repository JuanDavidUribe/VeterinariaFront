import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Owner } from '../interfaces/owner';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private Http: HttpClient) { }

  getOwnersByPatient(id : number):Observable<Owner[]>{
    let ownersUrl = 'http://localhost:8080/api/owner/listByPatient/' + id;
    return this.Http.get<Owner[]>(`${ownersUrl}`);
  }
}
