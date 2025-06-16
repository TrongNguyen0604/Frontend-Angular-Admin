import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';

@Component({
  standalone: true,
  selector: 'app-heart',
  templateUrl: './heart.component.html',
  styleUrls: ['./heart.component.css'],
  imports: [
    CommonModule,
    RouterLink,
    NzTableModule,
    NzButtonModule,
    NzMessageModule // ✅ Thêm để dùng thông báo
  ]
})
export class HeartComponent implements OnInit {
  wishlist: number[] = [];
  wishlistProducts: any[] = [];

  constructor(private http: HttpClient, private message: NzMessageService) {}

  ngOnInit(): void {
    const data = localStorage.getItem('wishlist');
    this.wishlist = data ? JSON.parse(data) : [];

    // Load tất cả sản phẩm rồi lọc theo wishlist
    this.http.get<any[]>('http://localhost:3000/products').subscribe(products => {
      this.wishlistProducts = products.filter(p => this.wishlist.includes(p.id));
    });
  }

  removeFromWishlist(productId: number) {
    // Cập nhật localStorage
    this.wishlist = this.wishlist.filter(id => id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));

    // Cập nhật UI
    this.wishlistProducts = this.wishlistProducts.filter(p => p.id !== productId);

    // ✅ Hiển thị thông báo
    this.message.info('Đã xóa sản phẩm khỏi danh sách yêu thích 💔');
  }
}
