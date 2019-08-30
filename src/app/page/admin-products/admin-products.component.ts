import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Products } from 'src/app/model/products';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  productsData: Products[];
  sorterKey: string = '';
  sortDirection: number = 1;
  filterPhrase: string = '';
  changeCounter: number = 0;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getAll().subscribe(
      data => this.productsData = data,
    )
  }
  onClickSorter(pm) {
    if (this.sortDirection === 1) {
      this.sortDirection = -1
    } else {
      this.sortDirection = 1
    }
    this.sorterKey = pm;
  }
  onRemove(picked: Products) {
    this.productService.removeOne(picked.id).subscribe(
      response => {
        let index = this.productsData.indexOf(picked);
        this.productsData.splice(index, 1);
        this.changeCounter++;
      },
      err => console.error(err)
    )
  }

}
