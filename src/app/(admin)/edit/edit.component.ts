import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  constructor(
    private actRoute: ActivatedRoute,
    private api: HttpClient,
    private router: Router,
    private message: NzMessageService // Tiêm message service
  ) { }

  apiUrl: string = 'http://localhost:3000/products';
  id: number = 0;
  oldStudent: any;

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params['id'];
    console.log(this.id) //gán lại giá trị id bằng tham số truyền trên URL
    this.getDetail();
  }

  getDetail(): void { //lấy thông tin chi tiết -> đổ ra form edit
    this.api.get(`${this.apiUrl}/${this.id}`).subscribe(res => {
      console.log('Chi tiết sản phẩm:', res);
      if (res) {
        this.oldStudent = res;
      }
    })
  }

  onEdit(data: any): void {
    try {
      console.log('Dữ liệu gửi lên:', JSON.stringify(data)); // Kiểm tra vòng lặp
    } catch (error) {
      console.error('Lỗi khi chuyển đổi dữ liệu thành JSON:', error);
      return; // Nếu có lỗi, không tiếp tục gửi request
    }

    this.api.put(`${this.apiUrl}/${this.id}`, data).subscribe(res => {
      if (res) {
        this.message.success('Thêm sản phẩm thành công!');
        this.router.navigate(['admin/list']);
      }
    });
  }

}