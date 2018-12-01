import {Component, Input, OnInit} from '@angular/core';
import {GoodsService} from "../api/services/goodsService";
import {Goods} from "../api/models/goods";
import {Pagination} from "../api/models/pagination";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  pageNumber = 1;
  pagination: Pagination;
  goods: Goods[];
  @Input('productsAmount') productsAmount;

  constructor(private goodsService: GoodsService) { }

  ngOnInit() {
    this.productsAmount = Number(this.productsAmount);
    this.pagination = new Pagination(this.pageNumber, this.productsAmount);
     this.goodsService.getGoods(this.pagination).then(data => {
      this.goods = data;
    });
  }



}
