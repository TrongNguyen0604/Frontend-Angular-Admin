import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditProductComponent implements OnInit {
  product: any = {
    name: '',
    description: '',
    categoryName: '',
    brand: '',
    price: 0,
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    sizes: [],
    status: ''
  };

  categories: any[] = [];
  sizeOptions: string[] = ['36', '37', '38', '39', '40', '41', '42', '43', '44'];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get<any>(`http://localhost:3000/products/${id}`).subscribe(data => {
        this.product = data;
      });
    }

    this.http.get<any[]>(`http://localhost:3000/categories`).subscribe(data => {
      this.categories = data;
    });
  }

  onSizeChange(event: any): void {
    const size = event.target.value;
    if (event.target.checked) {
      if (!this.product.sizes.includes(size)) {
        this.product.sizes.push(size);
      }
    } else {
      this.product.sizes = this.product.sizes.filter((s: string) => s !== size);
    }
  }

  onUpdate(): void {
    const id = this.product.id;
    this.http.put(`http://localhost:3000/products/${id}`, this.product).subscribe(() => {
      alert('Cập nhật sản phẩm thành công!');
      this.router.navigate(['/admin/list']);
    });
  }
}
