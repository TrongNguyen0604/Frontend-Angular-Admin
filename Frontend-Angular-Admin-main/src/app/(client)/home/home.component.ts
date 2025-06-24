import { HeartComponent } from './../heart/heart.component';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
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
  imports: [
    NzDividerModule,
    NzTableModule,
    RouterModule,
    NzButtonModule,
    NzDrawerModule,
    NzTagModule,
    CommonModule,
    HeartComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  size: NzButtonSize = 'default';
  apiUrl: string = 'http://localhost:3000/products';
  categories: any[] = [];

  // Biến để lưu danh sách dự án (sản phẩm)
  homeProjects: any[] = [];
  filteredProjects: any[] = [];
  selectedCategory: string = '';
  searchKeyword: string = '';


  // Biến để lưu danh sách sản phẩm yêu thích
  wishlist: number[] = [];
  messages: string = '';
  showMessage: boolean = false;


  isVisible: boolean = false;

  @ViewChild('drawerRef', { static: false }) drawer!: NzDrawerComponent;

  constructor(private http: HttpClient, private api: HttpClient, private message: NzMessageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadData();
    const id = this.route.snapshot.paramMap.get('id'); // ✅ Load cả sản phẩm và danh mục
  }

  loadData(): void {
    this.http.get<any[]>('http://localhost:3000/categories').subscribe((categories) => {
      this.categories = categories;

      this.http.get<any[]>('http://localhost:3000/products').subscribe((products) => {
        const enrichedProducts = products.map((product) => {
          const category = this.categories.find((c) => c.id === product.categoryId || c.name === product.category);
          return {
            ...product,
            categoryName: category ? category.name : 'Không xác định'
          };
        });

        this.homeProjects = enrichedProducts;
        this.filteredProjects = enrichedProducts;
      });
    });
  }

  getList(): void {
    this.api.get<any[]>(this.apiUrl).subscribe((res) => {
      //  console.log('DATA từ API:', res);
      this.homeProjects = res;
      this.applyFilters(); // Quan trọng: áp dụng bộ lọc ban đầu
    });
  }




  // Hàm xử lý khi nhập từ khóa tìm kiếm
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchKeyword = input.value.toLowerCase();
    this.applyFilters();
  }

  // Hàm áp dụng cả tìm kiếm + lọc theo trạng thái
  applyFilters(): void {
    this.filteredProjects = this.homeProjects.filter(project => {
      const matchesCategory =
        !this.selectedCategory ||
        (project.status && project.status.toLowerCase() === this.selectedCategory.toLowerCase());

      const matchesSearch =
        !this.searchKeyword ||
        (project.name && project.name.toLowerCase().includes(this.searchKeyword));

      return matchesCategory && matchesSearch;
    });
  }


  toggleWishlist(productId: number) {
    const index = this.wishlist.indexOf(productId);
    if (index === -1) {
      this.wishlist.push(productId);
      this.showTempMessage('Đã thêm vào yêu thích ❤️');
    } else {
      this.wishlist.splice(index, 1);
      this.showTempMessage('Đã xóa khỏi yêu thích 💔');
    }

    // Lưu vào localStorage nếu cần
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }

  showTempMessage(msg: string) {
    this.messages = msg;
    this.showMessage = true;

    setTimeout(() => {
      this.showMessage = false;
    }, 2000); // 2 giây
  }

  scrollNext(container: HTMLElement) {
    container.scrollBy({ left: 300, behavior: 'smooth' });
  }

  scrollPrev(container: HTMLElement) {
    container.scrollBy({ left: -300, behavior: 'smooth' });
  }


}
