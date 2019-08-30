import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { Order } from 'src/app/model/order';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  list: Order[] = [];
  list$: Observable<any> = this.orderService.getAll();
  sorterKey: string = '';
  sortDirection: number = 1;
  filterPhrase: string = '';
  filterInput: string = '';
  changeCounter: number = 0;

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
  }

  onClickSorter(pm) {
    if (this.sortDirection === 1) {
      this.sortDirection = -1
    } else {
      this.sortDirection = 1
    }
    this.sorterKey = pm;
  }

  setfilterPhrase() {
    this.filterPhrase = this.filterInput;
  }
  resetSearch() {
    this.filterPhrase = '';
    this.filterInput = '';
  }

  // onDelete(order: Order) {
  //   this.orderService.remove(order.id).subscribe(
  //     response => {
  //       let index = this.list.indexOf(order);
  //       this.list.splice(index, 1);
  //       this.changeCounter++;
  //     },
  //     err => console.error(err)
  //   )
  // }

}
