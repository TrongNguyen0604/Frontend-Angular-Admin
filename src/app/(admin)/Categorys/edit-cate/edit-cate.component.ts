import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-edit-cate',
   standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-cate.component.html',
  styleUrl: './edit-cate.component.css'
})
export class EditCateComponent {
    constructor(
    private actRoute: ActivatedRoute,
    private api: HttpClient,
    private router: Router,
    private message: NzMessageService // Tiêm message service
  ) { }

  apiUrl: string = 'http://localhost:3000/categories';
  id: number = 0;
  category: any;

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params['id'];
    console.log(this.id) //gán lại giá trị id bằng tham số truyền trên URL
    this.getDetail();
  }

  getDetail(): void { //lấy thông tin chi tiết -> đổ ra form edit
    this.api.get(`${this.apiUrl}/${this.id}`).subscribe(res => {
      console.log('Chi tiết sản phẩm:', res);
      if (res) {
        this.category = res;
      }
    })
  }

 onEditCate(): void {
  try {
    console.log('Dữ liệu gửi lên:', JSON.stringify(this.category)); // ✅ Sửa lại ở đây
  } catch (error) {
    console.error('Lỗi khi chuyển đổi dữ liệu thành JSON:', error);
    return;
  }

  this.api.put(`${this.apiUrl}/${this.id}`, this.category).subscribe({
    next: () => {
      this.message.success('Cập nhật danh mục thành công!');
      this.router.navigate(['/admin/CateList']);
    },
    error: (err) => {
      this.message.error('Có lỗi xảy ra khi cập nhật.');
      console.error(err);
    }
  });
}

}
