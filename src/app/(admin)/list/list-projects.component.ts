import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { RouterLink } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzMessageService } from 'ng-zorro-antd/message';


import { NzDrawerComponent, NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-list-projects',
  imports: [NzDividerModule, NzTableModule, RouterLink, NzButtonModule, NzDrawerModule, NzTagModule, CommonModule],
  templateUrl: './list-projects.component.html',
  styleUrl: './list-projects.component.css',
})

export class ListProjectsComponent {
  size: NzButtonSize = 'default';
  apiUrl: string = 'http://localhost:3000/products';

  listProjects: any[] = [];        // Dữ liệu gốc
  filteredProjects: any[] = [];    // Dữ liệu sau khi lọc

  searchKeyword: string = '';
  selectedCategory: string = '';

  isVisible: boolean = false;

  @ViewChild('drawerRef', { static: false }) drawer!: NzDrawerComponent;

  constructor(private api: HttpClient, private message: NzMessageService) { }

  ngOnInit() {
    this.getList(); // Gọi khi khởi tạo
  }

  // Hàm lấy danh sách từ API
  async getList(): Promise<void> {
    this.api.get<any[]>(this.apiUrl).subscribe((res) => {
      this.listProjects = res;
      this.filteredProjects = res; // Gán dữ liệu ban đầu cho bảng
    });
  }

  // Hàm lọc theo trạng thái
  filterByCategory(selectedCategory: string) {
    if (!selectedCategory) {
      this.filteredProjects = this.listProjects; // Không chọn gì → hiện tất cả
    } else {
      this.filteredProjects = this.listProjects.filter(project => project.status === selectedCategory);
    }
  }
  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    this.filterByCategory(selectedValue);
  }
  // and lọc

  //tìm kiếm 
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchKeyword = input.value.toLowerCase();
    this.applyFilters();
  }
  applyFilters(): void {
    this.filteredProjects = this.listProjects.filter(project => {
      const matchesCategory = !this.selectedCategory || project.status === this.selectedCategory;
      const matchesSearch = !this.searchKeyword || project.name.toLowerCase().includes(this.searchKeyword);
      return matchesCategory && matchesSearch;
    });
  }
  

  //and tìm kiếm 

  // Xoá sản phẩm
  async handleDelete(id: number): Promise<void> {
    if (confirm('Bạn có muốn xóa dự án này?')) {
      this.api.delete(`${this.apiUrl}/${id}`).subscribe({
        next: () => {
          this.message.success('Xóa thành công!');
          this.getList(); // Tải lại danh sách sau khi xoá
        },
        error: (err) => {
          this.message.error(`Lỗi: ${err.message}`);
        }
      });
    }
  }

  // Drawer
  showDrawer(): void {
    this.isVisible = true;
    setTimeout(() => {
      if (this.drawer) {
        console.log('Nội dung Drawer:', this.drawer.getContentComponent());
      }
    }, 100);
  }

  closeDrawer(): void {
    this.isVisible = false;
  }

  ngAfterViewInit(): void {
    console.log('Drawer đã render');
  }
}
