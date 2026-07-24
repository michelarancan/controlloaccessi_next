import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersoneService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/persone';

  //GET all
  getAll(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.apiUrl}`);
  }

}