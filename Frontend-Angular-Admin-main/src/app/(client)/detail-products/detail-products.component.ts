import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDrawerComponent, NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  selector: 'app-list-projects',
  imports: [
    NzDividerModule,
    NzTableModule,
    NzSpinModule,
    NzButtonModule,
    NzDrawerModule,
    NzTagModule,
    CommonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './detail-products.component.html',
  styleUrl: './detail-products.component.css',

})
export class DetailProductsComponent implements OnInit {
  size: NzButtonSize = 'default';
  apiUrl: string = 'http://localhost:3000/products/${id}';
  categories: any[] = [];

  homeProjects: any[] = [];
  filteredProjects: any[] = [];
  selectedCategory: string = '';
  searchKeyword: string = '';
  isLoading = true;

  sizes: any[] = [];
  selectedSize: { [key: number]: string } = {}; // key là id của sản phẩm

  currentUser: any = null;



  //bình luận 
  // Gán nhiều bình luận theo id sản phẩm
  showComments: { [key: number]: boolean } = {};

  newComment: { [key: number]: string } = {};

  comments: any[] = []; // Danh sách bình luận (bao gồm cả productId)


  isVisible: boolean = false;

  @ViewChild('drawerRef', { static: false }) drawer!: NzDrawerComponent;

  constructor(private http: HttpClient, private api: HttpClient, private message: NzMessageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.loadComments();

    const id = this.route.snapshot.paramMap.get('id');
    this.isLoading = true; // 👉 Bắt đầu loading

    // Lấy danh sách size
    this.http.get<any[]>('http://localhost:3000/size').subscribe((sizes) => {
      this.sizes = sizes;
    });


    if (id) {
      this.http.get<any[]>('http://localhost:3000/categories').subscribe((categories) => {
        this.categories = categories;

        this.http.get<any>(`http://localhost:3000/products/${id}`).subscribe((product) => {
          const category = categories.find((c) => c.id === product.categoryId || c.name === product.category);
          const enrichedProduct = {
            ...product,
            categoryName: category ? category.name : 'Không xác định'
          };

          this.homeProjects = [enrichedProduct];
          this.filteredProjects = [enrichedProduct];

          this.isLoading = false; // 👉 Dừng loading sau khi lấy xong
        });
      });
    }

  }

  selectSize(productId: number, size: string) {
    this.selectedSize[productId] = size;
  }

  setMainImage(s: any, imageUrl: string) {
    s.currentImage = imageUrl;
  }



  if(id: any) {
    this.http.get<any[]>('http://localhost:3000/categories').subscribe((categories) => {
      this.categories = categories;

      this.http.get<any>(`http://localhost:3000/products/${id}`).subscribe((product) => {
        const category = categories.find((c) => c.id === product.categoryId || c.name === product.category);
        const enrichedProduct = {
          ...product,
          categoryName: category ? category.name : 'Không xác định'
        };

        this.homeProjects = [enrichedProduct];
        this.filteredProjects = [enrichedProduct];
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
  addToCart(product: any): void {
    const size = this.selectedSize[product.id];

    if (!size) {
      this.message.warning('Vui lòng chọn size trước khi thêm vào giỏ hàng!');
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const existingProduct = cart.find(
      (item: any) => item.id === product.id && item.selectedSize === size
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, selectedSize: size, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    this.message.success(`Đã thêm "${product.name}" - size ${size} vào giỏ hàng!`);
  }



  getCurrentUser() {
    // Giả sử user đang được lưu trong localStorage
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
  }


  loadComments() {
    this.http.get<any[]>('http://localhost:3000/comments?_expand=user').subscribe(res => {
      this.comments = res.reverse(); // mới nhất lên đầu
    });
  }




  toggleComments(productId: number) {
    this.showComments[productId] = !this.showComments[productId];

    if (this.showComments[productId]) {
      this.getCommentsByProductId(productId).subscribe((data) => {
        this.comments[productId] = data;
      });
    }
  }


  submitComment(productId: number) {
    const content = this.newComment[productId];
    if (!content) return;

    const comment = {
      productId: productId,
      content: content,
      user: this.currentUser
    };

    this.http.post('http://localhost:3000/comments', comment).subscribe(() => {
      this.newComment[productId] = '';

      // Sau khi gửi -> gọi lại API để cập nhật bình luận mới
      this.getCommentsByProductId(productId).subscribe((data) => {
        this.comments[productId] = data;
      });
    });
  }



  getCommentsByProductId(productId: number) {
    return this.http.get<Comment[]>(`http://localhost:3000/comments?productId=${productId}`);
  }



}
