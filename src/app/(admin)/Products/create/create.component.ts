import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-product',
  imports: [CommonModule, FormsModule],
  templateUrl: 'create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateProductComponent implements OnInit {
  categories: any[] = [];
  sizeOptions: string[] = ['FR34', 'FR35', 'FR36', 'FR37', 'FR38', 'FR39', 'FR40'];
  product: {
    name: string;
    description: string;
    categoryName: string;
    brand: string;
    price: number | null;
    image1: string;
    image2: string;
    image3: string;
    image4: string;
    sizes: string[];     // 👉 Khai báo rõ kiểu mảng string
    status: string;
  } = {
      name: '',
      description: '',
      categoryName: '',
      brand: '',
      price: null,
      image1: '',
      image2: '',
      image3: '',
      image4: '',
      sizes: [],           // 👈 Lúc này TypeScript biết đây là string[]
      status: ''
    };


  constructor(
    private http: HttpClient,
    private router: Router,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/categories').subscribe(data => {
      this.categories = data;
    });
  }

  onSizeChange(event: any): void {
    const value = event.target.value;
    if (event.target.checked) {
      this.product.sizes.push(value);
    } else {
      this.product.sizes = this.product.sizes.filter(size => size !== value);
    }
  }

  onCreate(): void {
    if (
      !this.product.name ||
      !this.product.description ||
      !this.product.categoryName ||
      !this.product.brand ||
      !this.product.price ||
      !this.product.image1 ||
      !this.product.status
    ) {
      this.message.warning('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    this.http.post('http://localhost:3000/products', this.product).subscribe({
      next: () => {
        this.message.success('Thêm sản phẩm thành công!');
        this.router.navigate(['/admin/list']);
      },
      error: () => {
        this.message.error('Thêm sản phẩm thất bại!');
      },
    });
  }
}

