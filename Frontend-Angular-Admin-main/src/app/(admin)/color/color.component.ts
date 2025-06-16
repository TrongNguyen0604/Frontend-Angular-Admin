import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';


interface color {
  id: number;
  name: string;
} 
@Component({
  selector: 'app-color',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './color.component.html',
  styleUrl: './color.component.css'
})

export class ColorComponent implements OnInit {
  color: color[] = [];
  newcolor: string = '';
  editMode = false;
  editId: number | null = null;
  private apiUrl = 'http://localhost:3000/color';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchcolor();
  }

  fetchcolor() {
    this.http.get<color[]>(this.apiUrl).subscribe(data => this.color = data);
  }
  addcolor() {
    if (!this.newcolor.trim()) return;
    const newItem = { name: this.newcolor.trim() };
    this.http.post<color>(this.apiUrl, newItem).subscribe({
      next: () => {
        alert('✅ Thêm color thành công!');
        this.newcolor = '';
        this.fetchcolor();
      },
      error: () => {
        alert('❌ Thêm color thất bại.');
      }
    });
  }


  startEdit(color: color) {
    this.editMode = true;
    this.newcolor = color.name;
    this.editId = color.id;
  }

  updatecolor() {
    if (this.editId !== null && this.newcolor.trim()) {
      const updatedItem = { id: this.editId, name: this.newcolor.trim() };
      this.http.put<color>(`${this.apiUrl}/${this.editId}`, updatedItem).subscribe({
        next: () => {
          alert('✅ Cập nhật color thành công!');
          this.cancelEdit();
          this.fetchcolor();
        },
        error: () => {
          alert('❌ Cập nhật thất bại.');
        }
      });
    }
  }
  deletecolor(id: number) {
    if ((confirm('aban có chắc muốn xóa kích cỡ này?'))) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => this.fetchcolor());
    }
  }

  cancelEdit() {
    this.editMode = false;
    this.newcolor = '';
    this.editId = null;
  }
}

