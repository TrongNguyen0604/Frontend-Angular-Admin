import { resolve } from 'node:path';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth/auth.service';


@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
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
      const token = res?.accessToken;
      if (token) {
        localStorage.setItem('token', token);

        // Gọi tiếp để lấy danh sách users
        this.auth.getUsers().subscribe((users: any[]) => {
          const currentUser = users.find(u => u.email === data.email); // tìm user theo email đăng nhập

          if (currentUser) {
            localStorage.setItem('user', JSON.stringify(currentUser));
            alert('Đăng nhập thành công');
            this.router.navigate(['/profile']);
          } else {
            alert('Không tìm thấy người dùng');
          }
        });
      }
    });
  }


}
