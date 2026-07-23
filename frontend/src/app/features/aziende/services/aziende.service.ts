import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Azienda } from '../models/azienda.model';

@Injectable({
  providedIn: 'root'
})
export class AziendeService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/aziende';

  //GET all
  getAll(): Observable<Azienda[]> {
    return this.http.get<Azienda[]>(`${this.apiUrl}`);
  }

}