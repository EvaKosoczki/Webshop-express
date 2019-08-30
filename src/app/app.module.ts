import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NguCarouselModule } from '@ngu/carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ModalComponent } from './modal/modal.component';
import { IndexComponent } from './page/index/index.component';
import { ProductsComponent } from './page/products/products.component';
import { ProductDetailComponent } from './page/product-detail/product-detail.component';
import { AdminOrdersComponent } from './page/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './page/admin-products/admin-products.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { AdminHomeComponent } from './page/admin-home/admin-home.component';
import { AdminProductsEditComponent } from './page/admin-products-edit/admin-products-edit.component';
import { AdminOrderEditComponent } from './page/admin-order-edit/admin-order-edit.component';
import { AdminProductsAddComponent } from './page/admin-products-add/admin-products-add.component';
import { CustomCurrencyPipe } from './pipe/custom-currency/custom-currency.pipe';
import { SortPipe} from './pipe/sort.pipe';
import { SorterPipe } from './pipe/sorter/sorter.pipe';
import { FilterPipe } from './pipe/filter/filter.pipe';
import { SearchPipe } from './pipe/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ModalComponent,
    IndexComponent,
    ProductsComponent,
    ProductDetailComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    PageNotFoundComponent,
    AdminHomeComponent,
    AdminProductsEditComponent,
    AdminOrderEditComponent,
    AdminProductsAddComponent,
    CustomCurrencyPipe,
    SorterPipe,
    SortPipe,
    SearchPipe,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    NguCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
