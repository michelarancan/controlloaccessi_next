import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonaAutorizzataInterna } from '../models/persona-autorizzata-interna.model';

@Injectable({
  providedIn: 'root'
})
export class PersoneAutorizzateInterneService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/persone-autorizzate-interne';

  //GET all
  getAll(idS: number): Observable<PersonaAutorizzataInterna[]> {
    return this.http.get<PersonaAutorizzataInterna[]>(`${this.apiUrl}/sedi/${idS}`);
  }

  //POST
  create(idP: number, personaAutorizzataInterna: Omit<PersonaAutorizzataInterna, 'id'>): Observable<any> {
    return this.http.post(`${this.apiUrl}/persone-interne/${idP}`, personaAutorizzataInterna);
  }

  //PUT
  update(id: number, personaAutorizzataInterna: {dataScadenza: string}): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, personaAutorizzataInterna);
  }

  //DELETE
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  //SEARCH
  search(idS: number, campo: string, valore: string): Observable<PersonaAutorizzataInterna[]> {
    return this.http.get<PersonaAutorizzataInterna[]>(`${this.apiUrl}/sedi/${idS}/search?campo=${campo}&valore=${valore}`);
  }

}