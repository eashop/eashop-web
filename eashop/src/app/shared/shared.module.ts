import { NgModule } from '@angular/core';


/* components */
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {SliderComponent} from "../slider/slider.component";
import {BrowserModule} from "@angular/platform-browser";
import {ProductCardComponent} from "../product-card/product-card.component";
import {ProductsListComponent} from "../products-list/products-list.component";


@NgModule({
  imports: [
  BrowserModule,

  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    ProductCardComponent,
    ProductsListComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    BrowserModule,
    ProductCardComponent,
    ProductsListComponent
  ]
})
export class SharedModule { }
