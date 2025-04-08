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

  apiUrl: string = 'http://localhost:3000/projects';

  onCreate(form: NgForm): void { 
    if (form.invalid) {
      alert('Vui lòng nhập đúng thông tin!');
      return;
    }

    this.api.post(this.apiUrl, form.value).subscribe(res => {
      if (res) {
        alert('Thêm thành công');
        this.router.navigate(['/list']);
      }
    });
  }
}
