import { Component, OnInit } from '@angular/core';
import { GoodsService } from '../api/services/goodsService';
import { Goods } from '../api/models/goods';
import { Pagination } from '../api/models/pagination';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  pageNumber: number = 1;
  goods: Goods[];
  pagination: Pagination;
  productsAmount: number = 3;
  constructor(private goodsService: GoodsService) { }

  ngOnInit() {
    this.productsAmount = Number(this.productsAmount);
    this.pagination = new Pagination(this.pageNumber, this.productsAmount);
    this.getProducts();
  }

  getProducts() {
    this.goodsService.getGoods(this.pagination).then(data => {
      this.goods = data;
    });
  }
}
