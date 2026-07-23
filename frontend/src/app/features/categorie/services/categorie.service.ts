import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/categorie';

  //GET all
  getAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}`);
  }

}