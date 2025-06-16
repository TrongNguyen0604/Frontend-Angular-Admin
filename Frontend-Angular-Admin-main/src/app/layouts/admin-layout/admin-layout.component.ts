
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';


@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,

  ],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
  isCollapsed = false;

  // Optional: Nếu bạn muốn kiểm tra quyền admin ở đây
  // constructor(private auth: AuthService, private router: Router) {}
  // ngOnInit() {
  //   const role = this.auth.getRole(); // ví dụ từ token
  //   if (role !== 'admin') {
  //     this.router.navigate(['/home']);
  //   }
  // }
}
