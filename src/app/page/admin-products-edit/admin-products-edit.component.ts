import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/model/products';
import { ProductService } from 'src/app/services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-products-edit',
  templateUrl: './admin-products-edit.component.html',
  styleUrls: ['./admin-products-edit.component.css']
})
export class AdminProductsEditComponent implements OnInit {
  oneProduct: Products;
  selectedProductId: number = 0;
  
  constructor(private productsService: ProductService,
    private ar: ActivatedRoute, private router: Router) {
    this.ar.params.forEach(
      params => {
        this.selectedProductId = params.id
        this.productsService.getOne(this.selectedProductId).subscribe(
          data => this.oneProduct = data
        )
      }
    )
  }

  ngOnInit() {

  };

  onSubmit(ev: Event) {
    ev.preventDefault();
    this.productsService.postOne(this.selectedProductId, this.oneProduct)
      .subscribe(
        response => {
          console.log("sikeres")
        },
        err =>{
          this.router.navigateByUrl("/admin/products")
          console.error(err)
        })
  }
  onCancel() {
    this.router.navigateByUrl("/admin/products")
  }
}
