import { NgModule } from '@angular/core';

/* components */
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';


@NgModule({
  imports: [
  ],
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
