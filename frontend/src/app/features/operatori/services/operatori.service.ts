import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operatore } from '../models/operatore.model';

@Injectable({
  providedIn: 'root'
})
export class OperatoriService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/operatori';

  //GET all
  getAll(idS: number): Observable<Operatore[]> {
    return this.http.get<Operatore[]>(`${this.apiUrl}/sedi/${idS}`);
  }

  //POST
  create(idS: number, operatore: Omit<Operatore, 'id'>): Observable<any> {
    return this.http.post(`${this.apiUrl}/sedi/${idS}`, operatore);
  }

  //PUT
  update(id: number, operatore: {nome: string, cognome: string}): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, operatore);
  }

  //DELETE
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  //SEARCH
  search(idS: number, campo: string, valore: string): Observable<Operatore[]> {
    return this.http.get<Operatore[]>(`${this.apiUrl}/sedi/${idS}/search?campo=${campo}&valore=${valore}`);
  }

}