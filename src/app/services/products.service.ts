import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { Observable } from 'rxjs';
import { Category, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends BaseHttpService {
  public getAllProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(`${this._apiUrl}/products`);
  }
  
  public getProductById(id: number | string): Observable<Product> {
    return this._http.get<Product>(`${this._apiUrl}/products/${id}`);
  }
  
  public getAllCategories(): Observable<Category[]> {
    return this._http.get<Category[]>(`${this._apiUrl}/products/categories`);
  }
}
