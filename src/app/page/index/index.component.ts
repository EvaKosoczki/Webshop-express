import { Component, OnInit } from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
import { Product } from 'src/app/model/product/product';
import { Products } from 'src/app/model/products';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private productService: ProductService,
    ) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(
      response => {
        this.products = response;
      }
    );
  }

}
