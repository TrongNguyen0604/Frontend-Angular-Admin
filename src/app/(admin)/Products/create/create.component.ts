import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  constructor(
    private api: HttpClient,
    private router: Router,
    private message: NzMessageService
  ) {}

  apiUrl: string = 'http://localhost:3000/categories';
  categories: any[] = [];

  category = {
    name: '',
    description: '',
    image: '',
    status: 'hoạt động'
  };



  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.api.get<any[]>(this.apiUrl).subscribe(data => {
      this.categories = data;
    });
  }

  isDuplicateName(name: string): boolean {
    return this.categories.some(c => c.name.trim().toLowerCase() === name.trim().toLowerCase());
  }

  onCreate(form: NgForm): void {
    if (form.invalid) {
      this.message.warning('Vui lòng điền đúng thông tin!');
      return;
    }

   

    this.api.post(this.apiUrl, this.category).subscribe({
      next: () => {
        this.message.success('Tạo danh mục thành công!');
        this.router.navigate(['/admin/list']);
      },
      error: () => {
        this.message.error('Đã có lỗi xảy ra khi tạo danh mục!');
      }
    });
  }
}
