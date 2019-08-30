import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Products } from 'src/app/model/products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-products-add',
  templateUrl: './admin-products-add.component.html',
  styleUrls: ['./admin-products-add.component.css']
})
export class AdminProductsAddComponent implements OnInit {
  addProduct: Products = new Products()
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit(ev: Event): void {
    ev.preventDefault()
    this.productService.addOne(this.addProduct).subscribe(
      response => {
        console.log('sikeres');
        this.router.navigateByUrl("/admin/products")
      },
      err =>
        console.error(err),

    )
  }
  onCancel() {
    this.router.navigateByUrl("/admin/products")
  }
}
