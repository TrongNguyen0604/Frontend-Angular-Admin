import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  ngOnInit(): void {
    const cart = localStorage.getItem('cart');
    this.cartItems = cart ? JSON.parse(cart) : [];

    this.total = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  onSubmit() {
    if (this.fullName && this.email && this.phone && this.address) {
      alert('Thanh toán thành công!');
      localStorage.removeItem('cart');
    } else {
      alert('Vui lòng điền đầy đủ thông tin.');
    }
  }

}
