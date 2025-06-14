import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  constructor(
    // private api: HttpClient, -> chuyển sang sử dụng service 
    private auth:AuthService,
    private router: Router
  ) { }

  // apiUrl: string = 'http://localhost:3000/register'; bỏ vì chuyển đổi sang service r 

  onRegister(data: any): void {
    // this.api.post(this.apiUrl, data).subscribe((res) => {
    this.auth.register(data).subscribe(res => {
      if (res) {
        alert("đăng ký thành công");
        this.router.navigate(['login']);
      }
    })
  }
}
