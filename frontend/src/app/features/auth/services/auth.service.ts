import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { AuthUser } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  getCurrentUser() {
    //TEMP
    //return of<AuthUser>({user: 'MARZOTTO\\STITV'});
    return this.http.get<AuthUser>('/whoami.aspx');
  }
}