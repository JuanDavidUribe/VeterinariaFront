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

  list() :Observable<Owner[]> {
    let listUrl = 'http://localhost:8080/api/owner/list';
    return this.Http.get<Owner[]>(`${listUrl}`);
  }

  listWithName (name: string): Observable<Owner[]>  {
    let listUrl = 'http://localhost:8080/api/owner/list/' + name;
    return this.Http.get<Owner[]>(`${listUrl}`);
  }
}
