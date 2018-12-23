import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product;
  constructor() { }

  ngOnInit() {
  }

}
