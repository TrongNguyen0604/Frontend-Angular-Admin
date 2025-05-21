import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDrawerComponent, NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-list-projects',
  imports: [
    NzDividerModule,
    NzTableModule,
    RouterLink,
    NzButtonModule,
    NzDrawerModule,
    NzTagModule,
    CommonModule
  ],
  templateUrl: './list-projects.component.html',
  styleUrl: './list-projects.component.css',
})
export class ListProjectsComponent implements OnInit, AfterViewInit {
  size: NzButtonSize = 'default';
  apiUrl: string = 'http://localhost:3000/products';
  categories: any[] = [];

  listProjects: any[] = [];
  filteredProjects: any[] = [];
  selectedCategory: string = '';
  searchKeyword: string = '';


  isVisible: boolean = false;

  @ViewChild('drawerRef', { static: false }) drawer!: NzDrawerComponent;

  constructor(private http: HttpClient, private api: HttpClient, private message: NzMessageService) { }

  ngOnInit(): void {
    this.loadData(); // ✅ Load cả sản phẩm và danh mục
  }

  loadData(): void {
    this.http.get<any[]>('http://localhost:3000/categories').subscribe((categories) => {
      this.categories = categories;

      this.http.get<any[]>('http://localhost:3000/products').subscribe((products) => {
        const enrichedProducts = products.map((product) => {
          const category = this.categories.find((c) => c.name.trim().toLowerCase() === product.categoryName.trim().toLowerCase());
          return {
            ...product,
            categoryName: category ? category.name : 'Không xác định'
          };
        });

        this.listProjects = enrichedProducts;
        this.filteredProjects = enrichedProducts;
      });
    });
  }

  getList(): void {
    this.api.get<any[]>(this.apiUrl).subscribe((res) => {
      //  console.log('DATA từ API:', res);
      this.listProjects = res;
      this.applyFilters(); // Quan trọng: áp dụng bộ lọc ban đầu
    });
  }

  // Hàm xử lý khi chọn trạng thái
  onStatusChange(event: Event): void {
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

  async handleDelete(id: number): Promise<void> {
    const confirmed = confirm('Bạn có muốn xóa dự án này?');
    if (!confirmed) return;

    try {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/${id}`));
      this.message.success('Xóa thành công!');
      this.loadData(); // Reload danh sách
    } catch (err: any) {
      this.message.error(`Lỗi khi xoá: ${err?.message || 'Không xác định'}`);
    }
  }

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
