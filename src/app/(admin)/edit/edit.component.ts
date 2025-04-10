import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-edit',
  imports: [FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  constructor(
    private actRoute:ActivatedRoute,
    private api:HttpClient,
    private router:Router
  ) {}

  apiUrl:string = 'http://localhost:3000/projects';
  id:number = 0;
  oldStudent: any;

  ngOnInit():void {
    this.id = this.actRoute.snapshot.params['id']; //gán lại giá trị id bằng tham số truyền trên URL
    this.getDetail();
  }

  getDetail():void { //lấy thông tin chi tiết -> đổ ra form edit
    this.api.get(`${this.apiUrl}/${this.id}`).subscribe(res => {
      if (res) {
        this.oldStudent = res;
      }
    })
  }

  onEdit(data:any):void { //cập nhật dữ liệu lên json-server
    this.api.put(`${this.apiUrl}/${this.id}`,data).subscribe(res => {
      if (res) {
        alert('Cập nhật thành công');
        this.router.navigate(['list']);
      }
    })
  }
}