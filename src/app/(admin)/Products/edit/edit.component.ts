import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  constructor(
    private actRoute: ActivatedRoute,
    private api: HttpClient,
    private router: Router,
    private message: NzMessageService
  ) {}

  apiUrl: string = 'http://localhost:3000/products';
  id: number = 0;
  oldStudent: any;
  
  product: any = {
    name: '',
    description: '',
    category: '',
    brand: '',
    price: 0,
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    status: ''
  };

  categories: any[] = [];

  ngOnInit(): void {
    this.id = +this.actRoute.snapshot.params['id'];
    this.getCategories();
    this.getDetail();
  }

  getCategories(): void {
    this.api.get<any[]>('http://localhost:3000/categories').subscribe(data => {
      this.categories = data;
    });
  }

  getDetail(): void {
    this.api.get(`${this.apiUrl}/${this.id}`).subscribe(res => {
      if (res) {
        this.product = res;
      }
    });
  }

  onEdit(): void {
    try {
      console.log('Dữ liệu gửi lên:', JSON.stringify(this.product));
    } catch (error) {
      console.error('Lỗi khi chuyển đổi dữ liệu thành JSON:', error);
      return;
    }

    this.api.put(`${this.apiUrl}/${this.id}`, this.product).subscribe({
      next: () => {
        this.message.success('Cập nhật sản phẩm thành công!');
        this.router.navigate(['/admin/list']);
      },
      error: (err) => {
        this.message.error('Cập nhật thất bại.');
        console.error(err);
      }
    });
  }
}
