// auth.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // hoặc URL API thật của bạn

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      map((res: any) => {
        // 👉 Lưu token + user info
        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('user', JSON.stringify(res.user));
        return res;
      })
    );
  }

  logout() {
    localStorage.clear();
  }

  getUserRole(): string | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr).role : null;
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }
}
