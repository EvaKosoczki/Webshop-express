import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from 'src/app/model/products';
import { Observable } from 'rxjs';

import { Product } from '../../model/product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  jsonUrl = 'http://localhost:3210/api/product';
  dataPath = 'http://localhost:3210/api/product';

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.jsonUrl);
  }

  getProductByID(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.jsonUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.dataPath, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.dataPath}/${product.id}`, product);
  }

  removeProduct(id: number): Observable<any> {
    return this.http.delete(`${this.dataPath}/${id}`);
  }

  getAll(): Observable<Products[]> {
    return this.http.get<Products[]>(this.jsonUrl)
  }

  getOne(id: number): Observable<Products> {
    return this.http.get<Products>(`${this.jsonUrl}/${id}`)
  }

  postOne(id: number, data: Products): Observable<Products> {
    return this.http.post<Products>(`${this.jsonUrl}/${id}`, data)
  }

  removeOne(id: number): Observable<Products> {
    return this.http.delete<Products>(`${this.jsonUrl}/${id}`)
  }

  addOne(data): Observable<Products> {
    return this.http.post<Products>(this.jsonUrl, data)
  }

}
