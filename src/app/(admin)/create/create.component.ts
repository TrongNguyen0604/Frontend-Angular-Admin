import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message'; // Thêm dòng này

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  constructor(
    private api: HttpClient,
    private router: Router,
    private message: NzMessageService // Tiêm message service
  ) {}

  apiUrl: string = 'http://localhost:3000/products';

  onCreate(form: NgForm): void {
    if (form.invalid) {
      this.message.warning('Vui lòng nhập đúng thông tin!');
      return;
    }

    const formValue = form.value;

    const product = {
      name: formValue.name,
      description: formValue.description,
      category: formValue.category,
      brand: formValue.brand,
      price: +formValue.price,
      image1: formValue.image1,
      image2: formValue.image2,
      image3: formValue.image3,
      image4: formValue.image4,
      status: formValue.status
    };

    this.api.post(this.apiUrl, product).subscribe({
      next: () => {
        this.message.success('Thêm sản phẩm thành công!');
        this.router.navigate(['/admin/list']);
      },
      error: (err) => {
        this.message.error('Có lỗi xảy ra khi thêm sản phẩm.');
        console.error(err);
      }
    });
  }
}
