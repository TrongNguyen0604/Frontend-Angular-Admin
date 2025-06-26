import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule, NzTableModule, NzButtonModule, NzSelectModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  users: any[] = [];
  apiUrl = 'http://localhost:3000/users';
  filteredUsers: any[] = [];
  selectedRole: string = 'all'; // default: tất cả
  constructor(private http: HttpClient, private message: NzMessageService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.users = data;
      this.applyFilter();
    });
  }
  applyFilter() {
    if (this.selectedRole === 'all') {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(user => user.role === this.selectedRole);
    }
  }

  deleteUser(id: number) {
    if (confirm('Bạn có chắc muốn xóa tài khoản này?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
        this.message.success('Xóa tài khoản thành công');
        this.loadUsers();
      }, () => {
        this.message.error('Xóa tài khoản thất bại');
      });
    }
  }

  updateStatus(user: any, status: string) {
    const updatedUser = { ...user, status };
    this.http.put(`${this.apiUrl}/${user.id}`, updatedUser).subscribe(() => {
      this.message.success('Cập nhật trạng thái thành công');
      this.loadUsers();
    }, () => {
      this.message.error('Cập nhật trạng thái thất bại');
    });
  }
}
