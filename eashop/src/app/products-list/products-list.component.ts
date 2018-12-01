import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GoodsService} from "../api/services/goodsService";
import {Goods} from "../api/models/goods";
import {Pagination} from "../api/models/pagination";
import {BehaviorSubject, Observable, of} from "rxjs";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  pageNumber = 1;
  pagination: Pagination;
  searchValue: string;
  @Input('productsAmount') productsAmount;
  @Input('products') goods;
  constructor(private goodsService: GoodsService) { }

  ngOnInit() {
    this.productsAmount = Number(this.productsAmount);
    this.pagination = new Pagination(this.pageNumber, this.productsAmount);
  }

  getProducts() {
    this.goodsService.getGoods(this.pagination).then(data => {
      this.goods = data;
      console.log(data);
    });
  }

  showMoreProducts() {
    this.productsAmount+=6;
    this.pagination.pageSize = this.productsAmount;
    this.getProducts();
  }

  doSearch(){
    if(this.searchValue != '') {
      this.goodsService.searchGoods(this.searchValue, 9, 1).then(data => {
        this.goods = data;
      });
    }
  }
}
