import { NgModule } from '@angular/core';

/* components */
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {SliderComponent} from "../slider/slider.component";
import {BrowserModule} from "@angular/platform-browser";



@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SliderComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    BrowserModule
  ]
})
export class SharedModule { }
