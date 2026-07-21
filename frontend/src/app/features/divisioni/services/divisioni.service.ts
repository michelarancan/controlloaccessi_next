import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Divisione } from '../models/divisione.model';

@Injectable({
  providedIn: 'root'
})
export class DivisioniService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/divisioni';

  //GET all by sede
  getAll(idS: number): Observable<Divisione[]> {
    return this.http.get<Divisione[]>(`${this.apiUrl}/sedi/${idS}`);
  }

}