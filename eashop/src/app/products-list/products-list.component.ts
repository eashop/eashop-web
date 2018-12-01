import { Component, OnInit } from '@angular/core';
import {GoodsService} from "../api/services/goodsService";
import {Goods} from "../api/models/goods";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  goods: Goods[];
  constructor(private goodsService: GoodsService) { }

  ngOnInit() {
     this.goodsService.getGoods().then(data => {
      this.goods = data;
      console.log(this.goods);
    });
  }



}
