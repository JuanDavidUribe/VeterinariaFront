import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Specie } from '../interfaces/specie';

@Injectable({
  providedIn: 'root'
})
export class SpecieService {

  constructor(private Http: HttpClient) { }

  listSpecies():Observable<Specie[]> {
    let listUrl = 'http://localhost:8080/api/specie/list';
    return this.Http.get<Specie[]>(`${listUrl}`);
  }
}
