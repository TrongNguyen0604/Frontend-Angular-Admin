import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-cate',
  templateUrl: './detail-cate.component.html',
  imports: [CommonModule],
})
export class DetailCateComponent implements OnInit {
  categoryName: string = '';
  products: any[] = [];

  allProducts = [
    {
      id: 3,
      name: '1',
      category: 'thể thao',
      price: 1000,
      image1: 'https://picsum.photos/200/300',
      status: 'Đang bán'
    },
    {
      id: 4,
      name: 'Áo Gym',
      category: 'thời trang',
      price: 500,
      image1: 'https://picsum.photos/200/300',
      status: 'Đang bán'
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const name = params.get('name');
      if (name) {
        this.categoryName = name.toLowerCase();
        this.products = this.allProducts.filter(
          product => product.category.toLowerCase() === this.categoryName
        );
      }
    });
  }
}
