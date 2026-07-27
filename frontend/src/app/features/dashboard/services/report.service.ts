import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IngressoStabilimento } from '../../ingressi-stabilimento/models/ingresso-stabilimento.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/report';

  //GET accessi by data
  getAccessiByData(idSede: number, data: string): Observable<IngressoStabilimento[]> {
    return this.http.get<IngressoStabilimento[]>(`${this.apiUrl}/accessi-giornalieri/sedi/${idSede}?data=${data}`);
  }

  //genera PDF
  generatePDF(idSede: number, data: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/accessi-giornalieri/sedi/${idSede}/pdf?data=${data}`, { responseType: 'blob'});
  }

}