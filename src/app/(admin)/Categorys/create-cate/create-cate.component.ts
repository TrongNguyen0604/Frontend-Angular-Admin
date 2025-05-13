import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd/message';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-cate',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-cate.component.html',
  styleUrl: './create-cate.component.css'
})
export class CreateCateComponent {
  constructor(
    private api: HttpClient,
    
    private router: Router,
    private message: NzMessageService // Tiêm message service
  ) {}

  apiUrl: string = 'http://localhost:3000/categories';
  
   onCreateCate(form: NgForm): void {
    if (form.invalid) {
      this.message.warning('Vui lòng nhập đúng thông tin!');
      return;
    }

    const formValue = form.value;

    const Category = {
      name: formValue.name,
      description: formValue.description,     
      image: formValue.image,
      status: formValue.status
    };

    this.api.post(this.apiUrl, Category).subscribe({
      next: () => {
        this.message.success('Thêm danh mục thành công!');
        this.router.navigate(['/admin/CateList']);
      },
      error: (err) => {
        this.message.error('Có lỗi xảy ra khi thêm sản phẩm.');
        console.error(err);
      }
    });
  }





}
