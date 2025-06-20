import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  avatarUrl: string = '';
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('file', file);

      this.http.post<{ url: string }>('http://localhost:3000/upload', formData).subscribe({
        next: (res) => {
          this.avatarUrl = res.url;        // URL trả về từ server
          this.previewUrl = res.url;       // hiển thị ảnh
        },
        error: (err) => {
          console.error('Upload ảnh thất bại', err);
        }
      });
    }
  }


  onRegister(formValue: any): void {
    // Nếu không có previewUrl thì dùng ảnh mặc định
    formValue.avatar = this.previewUrl || 'https://i.pravatar.cc/150?img=3';

    this.http.post('http://localhost:3000/users', formValue)
      .subscribe({
        next: res => {
          alert('Đăng ký thành công!');
          this.router.navigate(['/login']);
        },
        error: err => {
          console.error('Đăng ký thất bại:', err);
        }
      });
  }

}
