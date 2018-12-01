import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { GoodsService } from './api/services/goodsService';
import { AccountService } from './api/services/accountService';
import { HttpClientModule } from '@angular/common/http';
import { CategoryPageComponent } from './category-page/category-page.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductCardBigComponent } from './product-card-big/product-card-big.component';
import {RouterModule} from "@angular/router";
import {ProductCardComponent} from "./product-card/product-card.component";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {SliderComponent} from "./slider/slider.component";
import {ProductsListComponent} from "./products-list/products-list.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomePageComponent,
    ProductDetailPageComponent,
    NotFoundComponent,
    CategoryPageComponent,
    ProductCardBigComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    ProductCardComponent,
    ProductsListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule],
  providers: [
    GoodsService,
    AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


