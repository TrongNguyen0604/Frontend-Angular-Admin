import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  
  constructor() { }
  getProductsByCategory(categoryId: number): Observable<any[]> {
  return this.http.get<any[]>(`/api/categories/${categoryId}/products`);
}

}
