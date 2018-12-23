import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from "@angular/router";
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ModalModule} from 'ngx-bootstrap/modal';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {HomePageComponent} from './home-page/home-page.component';
import {CategoryPageComponent} from './category-page/category-page.component';
import {ProductDetailPageComponent} from './product-detail-page/product-detail-page.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ProductCardComponent} from "./product-card/product-card.component";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {SliderComponent} from "./slider/slider.component";
import {ProductsListComponent} from "./products-list/products-list.component";
import {AddNewProductComponent} from "./add-new-product/add-new-product.component";

import {CategoryService} from "./api/services/categoryService";
import {GoodsService} from './api/services/goodsService';
import {AccountService} from './api/services/accountService';
import {AuthGuard} from "./api/guards/auth-guard.service";
import {AuthInterceptor} from "./api/interceptors/auth.interceptor";
import {FileService} from "./api/services/fileService";
import { EditProductComponent } from './edit-product/edit-product.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomePageComponent,
    ProductDetailPageComponent,
    NotFoundComponent,
    CategoryPageComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    ProductCardComponent,
    ProductsListComponent,
    AddNewProductComponent,
    EditProductComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule],
  providers: [
    GoodsService,
    AccountService,
    CategoryService,
    FileService,
    AuthGuard,
      {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}


