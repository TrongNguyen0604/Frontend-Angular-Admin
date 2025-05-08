import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { RouterLink } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';


import { NzDrawerComponent, NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-list-projects',
  imports: [NzDividerModule, NzTableModule, NzButtonModule, NzDrawerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent {


  [x: string]: any;
  constructor(private api: HttpClient, private message: NzMessageService) { }

  size: NzButtonSize = 'default';
  apiUrl: string = 'http://localhost:3000/projects';
  homeProjects: any;

  ngOnInit(): void {
    this.getList();
  }


  async getList(): Promise<void> {
    await this.api.get(this.apiUrl).subscribe((res) => {
      // console.log(res);
      this.homeProjects = res;
    });
  }





  isVisible: boolean = false;  // Khởi tạo biến trạng thái

  @ViewChild('drawerRef', { static: false }) drawer!: NzDrawerComponent;

  showDrawer(): void {
    console.log('Mở Drawer');
    this.isVisible = true; // Mở drawer

    // Đợi Drawer render xong, sau đó lấy nội dung
    setTimeout(() => {
      if (this.drawer) {
        console.log('Nội dung Drawer:', this.drawer.getContentComponent());
      }
    }, 100);

  }

  closeDrawer(): void {
    this.isVisible = false; // Đóng drawer
  }
  ngAfterViewInit(): void {
    console.log('Drawer đã render');
  }

}
