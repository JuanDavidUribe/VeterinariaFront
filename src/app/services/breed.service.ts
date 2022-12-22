import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Breed } from '../interfaces/breed';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreedService {

  constructor(private Http: HttpClient) { }

  listBreedsOfSpecie (idSpecie : number) :Observable<Breed[]>{
    let listUrl = 'http://localhost:8080/api/breed/list/' + idSpecie;
    return this.Http.get<Breed[]>(`${listUrl}`);
  }
}
