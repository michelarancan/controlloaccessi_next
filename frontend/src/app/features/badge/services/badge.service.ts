import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Badge } from '../models/badge.model';

@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/badge';

  //GET all by sede
  getAll(idS: number): Observable<Badge[]> {
    return this.http.get<Badge[]>(`${this.apiUrl}/sedi/${idS}`);
  }

}