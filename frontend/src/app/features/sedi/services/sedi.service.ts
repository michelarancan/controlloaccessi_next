import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sede } from '../models/sede.model';

@Injectable({
  providedIn: 'root'
})
export class SediService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/sedi';

  //GET all
  getAll(): Observable<Sede[]> {
    return this.http.get<Sede[]>(this.apiUrl);
  }

  //POST
  create(sede: Omit<Sede, 'id'>): Observable<any> {
    return this.http.post(this.apiUrl, sede);
  }

}