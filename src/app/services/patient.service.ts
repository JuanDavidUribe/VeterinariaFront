import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../interfaces/patient';
import { Breed } from '../interfaces/breed';
import { Specie } from '../interfaces/specie';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private Http: HttpClient) { }

  listWithName(name : string):Observable<Patient[]> {
    let listUrl = 'http://localhost:8080/api/patient/list/' + name;
    return this.Http.get<Patient[]>(`${listUrl}`);
  }

  list():Observable<Patient[]> {
    let listUrl = 'http://localhost:8080/api/patient/list';
    return this.Http.get<Patient[]>(`${listUrl}`);
  }

  breed(idBreed : number):Observable<Breed> {
    let breedUrl = 'http://localhost:8080/api/breed/search/'+ idBreed;
    return this.Http.get<Breed>(`${breedUrl}`);
  }

  specie(idBreed : number):Observable<Specie> {
    let specieUrl = 'http://localhost:8080/api/specie/search/'+ idBreed;
    return this.Http.get<Specie>(`${specieUrl}`);
  }

  addPatient(patient : Patient):Observable<void> {
    let addUrl = 'http://localhost:8080/api/patient/add';
    return this.Http.post<void>(`${addUrl}`, patient);
  }

}
