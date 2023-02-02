import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Owner } from '../interfaces/owner';
import { Observable } from 'rxjs';
import { Patient } from '../interfaces/patient';

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

  addOwner (owner : Owner) {
    let listUrl = 'http://localhost:8080/api/owner/add';
    return this.Http.post<Owner[]>(`${listUrl}`, owner);
  }

  deleteOwnerFromPatient (owner: Owner, patient : Patient) {
    let listUrl = 'http://localhost:8080/api/owner/delete/'+owner.id + '/' + patient.id;
    return this.Http.delete<Owner[]>(`${listUrl}`);
  }

  addOwnerToPatient (idOwner : number, idPatient : number) {
    let listUrl = 'http://localhost:8080/api/owner/addOwnerPatient/'+ idOwner + '/' + idPatient;
    return this.Http.get<Owner[]>(`${listUrl}`);
  }
}
