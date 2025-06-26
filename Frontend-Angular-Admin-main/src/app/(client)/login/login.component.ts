import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  onlogin(data: any): void {
    this.auth.login(data).subscribe((res: any) => {
      const token = res?.accessToken;

      if (token) {
        localStorage.setItem('token', token);

        // Sau khi có token, tìm thông tin user theo email
        this.auth.getUsers().subscribe((users: any[]) => {
          const currentUser = users.find(u => u.email === data.email);

          if (currentUser) {
            localStorage.setItem('user', JSON.stringify(currentUser));
            alert('Đăng nhập thành công');

            // 👉 Điều hướng theo role
            if (currentUser.role === 'admin') {
              this.router.navigate(['/admin/dashboard']);
            } else {
              this.router.navigate(['/profile']);
            }
          } else {
            alert('Không tìm thấy người dùng');
          }
        });
      } else {
        alert('Đăng nhập thất bại');
      }
    }, () => {
      alert('Email hoặc mật khẩu không đúng!');
    });
  }
}
