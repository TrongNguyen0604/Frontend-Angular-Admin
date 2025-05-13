import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule, NzDrawerComponent } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-list-cate',
  imports: [NzDividerModule, NzTableModule, RouterLink, NzButtonModule, NzDrawerModule, NzTagModule, CommonModule],
  templateUrl: './list-cate.component.html',
  styleUrl: './list-cate.component.css'
})
export class ListCateComponent {

  size: NzButtonSize = 'default';
  apiUrl: string = 'http://localhost:3000/categories';

  listProjects = [
    { id: 1, name: 'Giày thể thao', description: 'Giày chất lượng', image: 'image1.jpg', status: 'hoạt động' },
    { id: 2, name: 'Áo thun', description: 'Áo thun thời trang', image: 'image2.jpg', status: 'không hoạt động' },
    // Thêm dữ liệu mẫu
  ];      // Dữ liệu gốc
  filteredProjects: any[] = [];    // Dữ liệu sau khi lọc

  searchKeyword: string = '';
  selectedCategory: string = '';

  isVisible: boolean = false;

  @ViewChild('drawerRef', { static: false }) drawer!: NzDrawerComponent;

  constructor(private api: HttpClient, private message: NzMessageService, private router: Router) { }

  ngOnInit() {
    this.getList(); // Gọi khi khởi tạo
  }


  viewCategoryDetail(categoryName: string) {
    this.router.navigate(['/categories', categoryName.toLowerCase()]);
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
    const confirmed = confirm('Bạn có muốn xóa dự án này?');
    if (!confirmed) return;

    try {
      await firstValueFrom(this.api.delete(`${this.apiUrl}/${id}`));
      this.message.success('Xóa thành công!');
      this.getList(); // Tải lại danh sách sau khi xoá
    } catch (err: any) {
      this.message.error(`Lỗi khi xoá: ${err?.message || 'Không xác định'}`);
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
