import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { Order } from 'src/app/model/order';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { ProductService } from 'src/app/services/product/product.service';
import { Products } from 'src/app/model/products';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  orderList: Order[];
  orderNumbers: number;
  productList: Products[];
  productNumbers: number;
  faFileInvoice = faFileInvoice;
  faShoppingCart = faShoppingCart;

  constructor(
    private orderService: OrderService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.orderService.getAll().subscribe(
      orderData => {
        this.orderList = orderData,
          this.orderNumbers = this.orderList.length
      }
    );
    this.productService.getAll().subscribe(
      productData => {
        this.productList = productData,
        this.productNumbers = this.productList.length
      }
    )
  }

}
