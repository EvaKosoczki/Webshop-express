import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-admin-order-edit',
  templateUrl: './admin-order-edit.component.html',
  styleUrls: ['./admin-order-edit.component.css']
})
export class AdminOrderEditComponent implements OnInit {

  order: Order = new Order();
  orderID: number;


  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {
    this.ar.params.forEach(params => this.orderID = params.id);
    this.orderService.getOne(this.orderID).forEach(
      orderData => {
        this.order = orderData;
      }
    )
  }

  ngOnInit() {
  }

  onSubmit(ev: Event): void {
    ev.preventDefault();
    this.orderService.update(this.order).subscribe(
      orderData => {
        console.log('Changed:', orderData)
      },
      err => console.error(err),
    );
    this.router.navigate(['/admin/orders']);
  }

}
