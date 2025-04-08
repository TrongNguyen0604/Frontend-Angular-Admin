import { resolve } from 'node:path';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  onlogin(data: any): void {
    this.auth.login(data).subscribe((res: any) => {
      console.log(res)
     //lấy token lưu vào localStorage
     //lấy accessToken từ res
     const token = res?.accessToken;
     // lưu token vào trong localStorate
     localStorage.setItem('key', token);
     alert('đăng nhập thành công'), this.router.navigate(['/'])
    })
  }

}
