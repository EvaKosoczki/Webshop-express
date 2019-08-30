import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './page/index/index.component';
import { ProductsComponent } from './page/products/products.component';
import { ProductDetailComponent } from './page/product-detail/product-detail.component';
import { AdminProductsComponent } from './page/admin-products/admin-products.component';
import { AdminOrdersComponent } from './page/admin-orders/admin-orders.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { AdminHomeComponent } from './page/admin-home/admin-home.component';
import { AdminProductsEditComponent } from './page/admin-products-edit/admin-products-edit.component';
import { AdminOrderEditComponent } from './page/admin-order-edit/admin-order-edit.component';
import { AdminProductsAddComponent } from './page/admin-products-add/admin-products-add.component';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'products/product/:id',
    component: ProductDetailComponent
  },
  {
    path: 'admin',
    component: AdminHomeComponent
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent
  },
  {
    path: 'admin/orders/:id',
    component: AdminOrderEditComponent
  },
  {
    path: 'admin/products',
    component: AdminProductsComponent
  },
  {
    path: 'admin/products/:id',
    component: AdminProductsEditComponent
  },
  {
    path:'admin/products/new/add',
    component:AdminProductsAddComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
