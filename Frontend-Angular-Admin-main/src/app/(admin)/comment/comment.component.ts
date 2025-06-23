import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment',
  imports: [CommonModule],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
 products: any[] = [];
  comments: any[] = [];

  // Theo dõi sản phẩm đang mở bình luận
  expandedProductId: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadComments();
  }

  loadProducts() {
    this.http.get<any[]>('http://localhost:3000/products')
      .subscribe(data => this.products = data);
  }

  loadComments() {
    this.http.get<any[]>('http://localhost:3000/comments')
      .subscribe(data => this.comments = data);
  }

  // Lọc bình luận theo productId
  getCommentsByProduct(productId: number) {
    return this.comments.filter(comment => comment.productId === productId);
  }

  // Bật/tắt hiển thị bình luận
  toggleComments(productId: number) {
    this.expandedProductId = this.expandedProductId === productId ? null : productId;
  }
}
