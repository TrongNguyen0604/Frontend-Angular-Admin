import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';

interface Size {
  id: number;
  name: string;
}


@Component({
  selector: 'app-create-product',
  imports: [CommonModule, FormsModule],
  templateUrl: 'create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateProductComponent implements OnInit {
  categories: any[] = [];
  sizes: Size[] = [];
  selectedSizeId: number | null = null;

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
    sizes: string[]; // ✅ sẽ dùng để lưu nhiều size
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
      sizes: [],      // ✅ danh sách size được chọn
      status: ''
    };


  constructor(
    private http: HttpClient,
    private router: Router,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.fetchCategories();   // gọi API danh mục 
    this.fetchSizes();  // gọi API size
  }
  fetchCategories(): void {
    this.http.get<any[]>('http://localhost:3000/categories').subscribe(data => {
      this.categories = data;
    });
  }

  fetchSizes(): void {
    this.http.get<Size[]>('http://localhost:3000/size').subscribe(data => {
      this.sizes = data;
    });
  }





  onSizeChange(event: any): void {
    const value = event.target.value;
    if (event.target.checked) {
      if (!this.product.sizes.includes(value)) {
        this.product.sizes.push(value);
      }
    } else {
      this.product.sizes = this.product.sizes.filter(s => s !== value);
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
      !this.product.status ||
      !this.product.sizes   // ✅ kiểm tra thêm sizeId
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

