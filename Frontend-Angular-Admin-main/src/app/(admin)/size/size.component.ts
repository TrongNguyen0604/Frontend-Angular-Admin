import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Size {
  id: number;
  name: string;
}

@Component({
  selector: 'app-size',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.css']

})
export class SizeComponent implements OnInit {
  sizes: Size[] = [];
  newSize: string = '';
  editMode = false;
  editId: number | null = null;
  private apiUrl = 'http://localhost:3000/size';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchSizes();
  }

  fetchSizes() {
    this.http.get<Size[]>(this.apiUrl).subscribe(data => this.sizes = data);
  }
  addSize() {
    if (!this.newSize.trim()) return;
    const newItem = { name: this.newSize.trim() };
    this.http.post<Size>(this.apiUrl, newItem).subscribe({
      next: () => {
        alert('✅ Thêm size thành công!');
        this.newSize = '';
        this.fetchSizes();
      },
      error: () => {
        alert('❌ Thêm size thất bại.');
      }
    });
  }


  startEdit(size: Size) {
    this.editMode = true;
    this.newSize = size.name;
    this.editId = size.id;
  }

  updateSize() {
    if (this.editId !== null && this.newSize.trim()) {
      const updatedItem = { id: this.editId, name: this.newSize.trim() };
      this.http.put<Size>(`${this.apiUrl}/${this.editId}`, updatedItem).subscribe({
        next: () => {
          alert('✅ Cập nhật size thành công!');
          this.cancelEdit();
          this.fetchSizes();
        },
        error: () => {
          alert('❌ Cập nhật thất bại.');
        }
      });
    }
  }
  deleteSize(id: number) {
    if ((confirm('aban có chắc muốn xóa kích cỡ này?'))) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => this.fetchSizes());
    }
  }

  cancelEdit() {
    this.editMode = false;
    this.newSize = '';
    this.editId = null;
  }
}
