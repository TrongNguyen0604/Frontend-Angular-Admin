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

  listProjects: any[] = [];
  filteredProjects: any[] = [];

  selectedCategory: string = '';
  searchKeyword: string = '';

  isVisible: boolean = false;

  @ViewChild('drawerRef', { static: false }) drawer!: NzDrawerComponent;

  constructor(private api: HttpClient, private message: NzMessageService, private router: Router) { }

  ngOnInit() {
    this.getList(); // Gọi khi khởi tạo

  }

  viewCategoryDetail(categoryName: string) {
    this.router.navigate(['/categories', categoryName.toLowerCase()]);
  }

  getList(): void {
    this.api.get<any[]>(this.apiUrl).subscribe((res) => {
      //  console.log('DATA từ API:', res);
      this.listProjects = res;
      this.applyFilters(); // Quan trọng: áp dụng bộ lọc ban đầu
    });
  }

  // Hàm xử lý khi chọn trạng thái
  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCategory = target.value;
    this.applyFilters();
  }

  // Hàm xử lý khi nhập từ khóa tìm kiếm
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchKeyword = input.value.toLowerCase();
    this.applyFilters();
  }

  // Hàm áp dụng cả tìm kiếm + lọc theo trạng thái
  applyFilters(): void {
    this.filteredProjects = this.listProjects.filter(project => {
      const matchesCategory =
        !this.selectedCategory ||
        (project.status && project.status.toLowerCase() === this.selectedCategory.toLowerCase());

      const matchesSearch =
        !this.searchKeyword ||
        (project.name && project.name.toLowerCase().includes(this.searchKeyword));

      return matchesCategory && matchesSearch;
    });
  }


  // Gọi hàm này khi load dữ liệu ban đầu


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

}
