import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { NewOrderService } from 'src/app/services/new-order/new-order.service';
import { Product } from 'src/app/model/product/product';
import { Products } from 'src/app/model/products';
import { Order } from 'src/app/model/order';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  newOrder: Order = new Order();
  newOrderID: number;
  orders: Order[];
  orderID: number;
  oneProduct: Product;
  selectedProductId: number = 0;
  orderString: string;

  title = 'Product details';

  constructor(

    private productService: ProductService,
    private ar: ActivatedRoute,
    private router: Router,
    private orderService: NewOrderService
  ) { 
    this.ar.params.forEach(
      param => this.selectedProductId = Number.parseInt(param.id, 10)
    );
    this.newOrder.product = this.selectedProductId;
  }

  ngOnInit() {
    this.productService.getProductByID(this.selectedProductId).subscribe(
      response => {
        this.oneProduct = response;
        //this.oneProduct = this.oneProduct[0];
      }
    );
    this.orderService.getAll().subscribe(
      response => {
        this.orders = response;
        this.newOrderID = this.orders.length + 1;
        this.newOrder.id = this.newOrderID;
      }
    );
  }

  onSubmit(ev: Event): void {
    ev.preventDefault();
    this.newOrder.insdate = this.getActualDate();
    console.log(this.newOrder);
    this.orderService.newOrder(this.newOrder).subscribe(
      response => {
        console.log('sikeres');
      },
      err => {
        console.error(err);
      }
    );
  }

getActualDate(): any {
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDay();
  return `${y}-${m}-${d}`;
}

}
