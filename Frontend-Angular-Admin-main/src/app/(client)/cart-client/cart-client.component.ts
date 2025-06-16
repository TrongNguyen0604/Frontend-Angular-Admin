import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-client',
  imports: [CommonModule,RouterLink],
  templateUrl: './cart-client.component.html',
  styleUrl: './cart-client.component.css'
})
export class CartClientComponent {
  cartItems: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const cart = localStorage.getItem('cart');
    this.cartItems = cart ? JSON.parse(cart) : [];
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  removeItem(id: number, selectedSize: string): void {
    this.cartItems = this.cartItems.filter(
      (item) => !(item.id === id && item.selectedSize === selectedSize)
    );
    this.saveToLocalAndServer();
  }

  increaseQuantity(item: any) {
    item.quantity += 1;
    this.saveToLocalAndServer();
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.saveToLocalAndServer();
    }
  }

  updateQuantity(item: any, event: Event) {
    const input = event.target as HTMLInputElement;
    const qty = parseInt(input.value, 10);
    if (qty > 0) {
      item.quantity = qty;
      this.saveToLocalAndServer();
    }
  }

  saveToLocalAndServer() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.http.post('http://localhost:3000/carts', { items: this.cartItems }).subscribe({
      next: () => console.log('Cart saved to server'),
      error: (err) => console.error('Lỗi khi lưu cart:', err),
    });
  }


}

