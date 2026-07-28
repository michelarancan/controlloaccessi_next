import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chiave } from '../models/chiave.model';

@Injectable({
  providedIn: 'root'
})
export class ChiaveService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/chiavi';

  //GET all around by sede
  getAllAround(idS: number): Observable<Chiave[]> {
    return this.http.get<Chiave[]>(`${this.apiUrl}/sedi/${idS}/non-consegnate`);
  }

}