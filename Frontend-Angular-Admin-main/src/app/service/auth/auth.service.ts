
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // import HttpClient
  constructor(private api: HttpClient) { }



  apiUrl: string = 'http://localhost:3000'; //khai báo API url,


  // khai báo hàm đăng ký 
  registerUser(formData: FormData) {
    return this.api.post('http://localhost:3000/users', formData);
  }




  // khai báo hàm đăng nhập
  login(data: any): Observable<object> {
    return this.api.post<any>(this.apiUrl + '/login', data)
  }

  getUsers(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.api.get(this.apiUrl + '/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }



  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

}
