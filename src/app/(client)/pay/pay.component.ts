import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pay',
  imports: [
    CommonModule,
    FormsModule,
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

    constructor(private router: Router) {}

  ngOnInit(): void {
    const cart = localStorage.getItem('cart');
    this.cartItems = cart ? JSON.parse(cart) : [];
    this.total = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  onSubmit() {
    if (this.fullName && this.email && this.phone && this.address) {
      alert('Thanh toán thành công!');
      localStorage.removeItem('cart');
      this.router.navigate(['/home']);
    } else {
      alert('Vui lòng điền đầy đủ thông tin.');
    }
  }

}
