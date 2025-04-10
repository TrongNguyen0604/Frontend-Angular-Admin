import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      this.router.navigate(['/']);
      return false;
    }

    const user = JSON.parse(userStr);
    if (user.role === 'admin') {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
