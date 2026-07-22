import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private http = inject(HttpClient);

    getCurrentUser() {
        return this.http.get<{ user: string }>(
            '/whoami.aspx'
        );
    }

}