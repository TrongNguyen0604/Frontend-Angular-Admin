import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-heart',
  imports: [CommonModule , RouterLink],
  templateUrl: './heart.component.html',
  styleUrls: ['./heart.component.css']
})
export class HeartComponent implements OnInit, OnChanges {
  @Input() filteredProjects: any[] = [];  // nhận dữ liệu từ cha

  wishlist: number[] = [];
  wishlistProducts: any[] = [];

  ngOnInit(): void {
    const data = localStorage.getItem('wishlist');
    this.wishlist = data ? JSON.parse(data) : [];
    this.updateWishlistProducts();
  }

  // Khi filteredProjects thay đổi (ví dụ API trả về mới, hoặc component cha truyền lại)
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filteredProjects']) {
      this.updateWishlistProducts();
    }
  }

  updateWishlistProducts() {
    this.wishlistProducts = this.filteredProjects.filter(p => this.wishlist.includes(p.id));
  }

  removeFromWishlist(productId: number) {
    this.wishlist = this.wishlist.filter(id => id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    this.updateWishlistProducts();
  }
  
}
