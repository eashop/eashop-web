import { Component, OnInit, EventEmitter } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {GoodsService} from "../api/services/goodsService";
import {daLocale} from "ngx-bootstrap";
import {Pagination} from "../api/models/pagination";

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {
  productsAmount: number = 9;
  pagination: Pagination = new Pagination(1, this.productsAmount);
  products;

  constructor(
    private goodsService: GoodsService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.checkRoute();
  }

   checkRoute(){
    if(this.router.url == '/category/men') {
      this.getProducts(5);
    } else if(this.router.url == '/category/women') {
      this.getProducts(6);
    } else if (this.router.url == '/category') {
      this.getProducts();
    }
  }

   getProducts (id?: number) {
    if(id) {
      this.goodsService.getGoodsFromCategory(id).then(data => {
        this.products = data;
      });
    } else {
      this.goodsService.getGoods(this.pagination).then(data => {
        this.products = data;
      });
    }
  }

}
