import { Component, OnInit, EventEmitter } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {GoodsService} from "../api/services/goodsService";
import {daLocale} from "ngx-bootstrap";
import {Pagination} from "../api/models/pagination";
import {CategoryService} from "../api/services/categoryService";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {
  productsAmount: number = 10;
  pagination: Pagination = new Pagination(1, this.productsAmount);
  products;
  categories = [];

  constructor(
    private categoryService: CategoryService,
    private goodsService: GoodsService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.checkRoute();
    this.categoryService.getCategories().then(data => {
        this.categories = data;
    });
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

  renderProductsFromCategory(id) {
     this.goodsService.getGoodsFromCategory(id).then(data => {
        this.products = []
        this.products = data;
         console.log(document.querySelector('.form-check-input').nodeValue);
     });
  }
}
