import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl: string = 'http://localhost:3210/api/orders';

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getOne(id: string | number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  };

  update(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/${order.id}`, order);
  }
}
  
