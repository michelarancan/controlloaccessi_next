import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IngressoStabilimento } from '../models/ingresso-stabilimento.model';

@Injectable({
  providedIn: 'root'
})
export class IngressiStabilimentoService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/ingressi-stabilimento';

  //GET all
  getAll(idS: number): Observable<IngressoStabilimento[]> {
    return this.http.get<IngressoStabilimento[]>(`${this.apiUrl}/sedi/${idS}`);
  }

  //GET all by data
  getAllByData(idS: number, inizioPeriodo: string, finePeriodo: string): Observable<IngressoStabilimento[]> {
    return this.http.get<IngressoStabilimento[]>(`${this.apiUrl}/sedi/${idS}/periodo?inizioPeriodo=${inizioPeriodo}&finePeriodo=${finePeriodo}`);
  }

  //POST
  create(ingresso: Omit<IngressoStabilimento, 'id'>): Observable<any> {
    return this.http.post(`${this.apiUrl}`, ingresso);
  }

  //PUT
  registerExit(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/uscita`, {});
  }

  //SEARCH
  search(idS: number, campo: string, valore: string): Observable<IngressoStabilimento[]> {
    return this.http.get<IngressoStabilimento[]>(`${this.apiUrl}/sedi/${idS}/search?campo=${campo}&valore=${valore}`);
  }

  //SEARCH by data
  searchByData(idS: number, campo: string, valore: string, inizioPeriodo: string, finePeriodo: string): Observable<IngressoStabilimento[]> {
    return this.http.get<IngressoStabilimento[]>(`${this.apiUrl}/sedi/${idS}/search/periodo?campo=${campo}&valore=${valore}&inizioPeriodo=${inizioPeriodo}&finePeriodo=${finePeriodo}`);
  }

}