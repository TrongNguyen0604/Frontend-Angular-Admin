import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  constructor(private api: HttpClient, private router: Router) {}

  apiUrl: string = 'http://localhost:3000/products';

  onCreate(form: NgForm): void {
    if (form.invalid) {
      alert('Vui lòng nhập đúng thông tin!');
      return;
    }

    const formValue = form.value;

    const product = {
      name: formValue.name,
      description: formValue.description,
      category: formValue.category,
      brand: formValue.brand,
      price: +formValue.price,
      images: [formValue.image1, formValue.image2, formValue.image3,formValue.image4].filter(Boolean),
      status: formValue.status
    };

    this.api.post(this.apiUrl, product).subscribe(res => {
      if (res) {
        alert('Thêm sản phẩm thành công!');
        this.router.navigate(['/admin/list']);
      }
    }, err => {
      alert('Có lỗi xảy ra khi thêm sản phẩm.');
      console.error(err);
    });
  }
}
