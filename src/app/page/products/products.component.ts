import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/model/product/product';
import { faListAlt, faTh, faSort } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  title = 'Available Products';
  faList = faListAlt;
  faTh = faTh;
  faSort = faSort;
  sorterKey: string;
  sorterDirection = 1;
  filterPhrase = '';
  listView = true;
  gridView = false;
  changeCounter = 0;  

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(
      response => {
        this.products = response;
      }
    );
  }

  setSortParams(key) {
    if (this.sorterKey === key) {
      this.sorterDirection *= -1;
    } else {
      this.sorterDirection = 1;
    }
    this.sorterKey = key;
    this.changeCounter++;
    (document.querySelector('#sort') as HTMLInputElement).value = '';
    (document.querySelector('#dir') as HTMLInputElement).value = '';
  }

  setListView() {
    this.listView = true;
    this.gridView = false;
    this.sorterKey = 'id';
  }

  setGridView() {
    this.gridView = true;
    this.listView = false;
    this.sorterKey = 'id';
  }

  selectSortParams() {
    const key = (document.querySelector('#sort') as HTMLInputElement).value;
    this.sorterKey = key;
  }

  setSortDirection() {
    const key = (document.querySelector('#dir') as HTMLInputElement).value;
    if (key === 'asc') {
      this.sorterDirection = 1;
    } else {
      this.sorterDirection = -1;
    }
  }

}
