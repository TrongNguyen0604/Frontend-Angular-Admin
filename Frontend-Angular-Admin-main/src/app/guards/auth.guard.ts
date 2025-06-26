import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    try {
      const userJson = localStorage.getItem('user');
      if (!userJson) {
        this.router.navigate(['/login']);
        return false;
      }

      const user = JSON.parse(userJson);

      // Kiểm tra nếu là admin thì cho truy cập
      if (user && user.role === 'admin') {
        return true;
      }

      // Không phải admin => redirect về trang chủ
      this.router.navigate(['/']);
      return false;

    } catch (error) {
      console.error('Lỗi parse user từ localStorage:', error);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
