import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonaInterna } from '../models/persona-interna.model';

@Injectable({
  providedIn: 'root'
})
export class PersoneInterneService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/persone-interne';

  //GET all
  getAll(idS: number): Observable<PersonaInterna[]> {
    return this.http.get<PersonaInterna[]>(`${this.apiUrl}/sedi/${idS}`);
  }

  //GET all by divisione
  getAllByDivisione(idD: number): Observable<PersonaInterna[]> {
    return this.http.get<PersonaInterna[]>(`${this.apiUrl}/divisioni/${idD}`);
  }

  //POST
  create(idS: number, personaInterna: Omit<PersonaInterna, 'id'>): Observable<any> {
    return this.http.post(`${this.apiUrl}/sedi/${idS}`, personaInterna);
  }

  //PUT
  update(idS: number, id: number, personaInterna: {nome: string, cognome: string, telefono: string, email: string, divisione: number, is_di_riferimento: boolean}): Observable<any> {
    return this.http.put(`${this.apiUrl}/sedi/${idS}/${id}`, personaInterna);
  }

  //DELETE
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  //SEARCH
  search(idS: number, campo: string, valore: string): Observable<PersonaInterna[]> {
    return this.http.get<PersonaInterna[]>(`${this.apiUrl}/sedi/${idS}/search?campo=${campo}&valore=${valore}`);
  }

  //SEARCH by divisione
  searchByDivisione(idD: number, campo: string, valore: string): Observable<PersonaInterna[]> {
    return this.http.get<PersonaInterna[]>(`${this.apiUrl}/divisioni/${idD}/search?campo=${campo}&valore=${valore}`);
  }

}