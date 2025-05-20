import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-layout',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css']
})
export class ClientLayoutComponent {

  // home.component.ts

searchTerm: string = '';
allProjects: any[] = []; // danh sách gốc (full sản phẩm)
filteredProjects: any[] = []; // danh sách đã lọc

ngOnInit() {
  // Giả sử bạn đã lấy dữ liệu từ API hoặc gán sẵn
  this.allProjects = [
    // danh sách sản phẩm mẫu
    { name: 'Nike Air Zoom', price: 2500000, image1: '...', description: '...' },
    { name: 'Adidas UltraBoost', price: 3000000, image1: '...', description: '...' },
    // ...
  ];
  this.filteredProjects = [...this.allProjects]; // ban đầu hiển thị tất cả
}

onSearch() {
  const term = this.searchTerm.toLowerCase().trim();
  this.filteredProjects = this.allProjects.filter(p =>
    p.name.toLowerCase().includes(term)
  );
}

}
