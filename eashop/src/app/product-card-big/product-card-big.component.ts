import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-product-card-big',
  templateUrl: './product-card-big.component.html',
  styleUrls: ['./product-card-big.component.scss']
})
export class ProductCardBigComponent implements OnInit {
  @Input('product') product;
  constructor() { }

  ngOnInit() {
    console.log(this.product);
  }

}
