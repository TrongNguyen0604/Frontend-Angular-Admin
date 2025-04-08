
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // import HttpClient
  constructor(private api:HttpClient) { }



  apiUrl:string = 'http://localhost:3000'; //khai báo API url,


  // khai báo hàm đăng ký 
  register(data:any): Observable<object>{
    return this.api.post(this.apiUrl+'/register',data)
  }



  // khai báo hàm đăng nhập
  login(data:any): Observable<object>{
    return this.api.post<any>(this.apiUrl+'/login',data)
  }


  
}
