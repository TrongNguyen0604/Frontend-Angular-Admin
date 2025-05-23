import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-client',
  imports: [CommonModule],
  templateUrl: './cart-client.component.html',
  styleUrl: './cart-client.component.css'
})
export class CartClientComponent {
  cartItems: any[] = [];

  ngOnInit(): void {
    const cart = localStorage.getItem('cart');
    this.cartItems = cart ? JSON.parse(cart) : [];
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  removeItem(id: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
  increaseQuantity(item: any) {
    item.quantity += 1;
    this.updateCartItem(item);
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.updateCartItem(item);
    }
  }

  // Hàm cập nhật giỏ hàng (ví dụ lưu lại hoặc gửi API nếu cần)
  updateCartItem(item: any) {
    // Nếu bạn có lưu giỏ hàng trong localStorage hoặc server, cập nhật ở đây
    // Ví dụ: localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
  updateQuantity(item: any, event: Event) {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;

    const value = input.value;
    const qty = parseInt(value, 10);
    if (qty > 0) {
      item.quantity = qty;
      // Cập nhật giỏ hàng nếu cần
    }
  }



}

