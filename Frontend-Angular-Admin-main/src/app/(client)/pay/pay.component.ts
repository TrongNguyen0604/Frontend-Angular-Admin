import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pay',
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  fullName = '';
  email = '';
  phone = '';
  address = '';
  total = 0;
  cartItems: any[] = [];

  constructor(private router: Router,private http: HttpClient) { }

  ngOnInit(): void {
    const cart = localStorage.getItem('cart');
    this.cartItems = cart ? JSON.parse(cart) : [];
    this.total = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  onSubmit() {
    if (this.fullName && this.email && this.phone && this.address) {
      // Gửi yêu cầu đến Node.js server
      this.http.post<any>('http://localhost:5000/payment', {}).subscribe({
        next: (response) => {
          const payUrl = response.payUrl;
          if (payUrl) {
            // Chuyển hướng đến trang thanh toán MoMo
            window.location.href = payUrl;
          } else {
            alert('Không lấy được liên kết thanh toán.');
          }
        },
        error: (err) => {
          console.error('Payment error:', err);
          alert('Thanh toán thất bại.');
        }
      });
    } else {
      alert('Vui lòng điền đầy đủ thông tin.');
    }
  }

}
