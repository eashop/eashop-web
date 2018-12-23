import { Component, OnInit, EventEmitter } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {GoodsService} from "../api/services/goodsService";
import {daLocale} from "ngx-bootstrap";
import {Pagination} from "../api/models/pagination";
import {CategoryService} from "../api/services/categoryService";
import {forEach} from "@angular/router/src/utils/collection";
import {element} from "protractor";
import {e} from "@angular/core/src/render3";

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {
  productsAmount: number = 14;
  pagination: Pagination = new Pagination(1, this.productsAmount);
  products;
  categories = [];
  searchValue;
  activeFilter: boolean = false;
  checkedBoxes = 0;
  categoryPage;

  constructor(
    private categoryService: CategoryService,
    private goodsService: GoodsService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.categoryPage = this.getRoute();
    switch (this.categoryPage) {
      case 'men': this.getProducts(1); break;
      case 'women': this.getProducts(2); break;
      case 'all': this.getProducts(); break;
    };
    this.categoryService.getCategories().then(data => {
        this.categories = data;
    });
  }

   getRoute(){
    if(this.router.url == '/category/men') {
      return 'men';
    } else if(this.router.url == '/category/women') {
      return 'women';
    } else if (this.router.url == '/category/all') {
      return 'all';
    }
  }

   getProducts (id?: number) {
    if(id) {
      this.goodsService.getGoodsFromCategory(id, this.pagination).then(data => {
        this.products = data;
      });
    } else {
      this.goodsService.getGoods(this.pagination).then(data => {
        this.products = data;
      });
    }
  }


  doSearch(){
    if(this.getCategoryIdByRoute() > 0){
      if(this.searchValue != '') {
          this.goodsService.searchGoods(this.searchValue.trim(), 14, 1, this.getCategoryIdByRoute()).then(data => {
            this.products = data;
          });
      } else {
        this.goodsService.getGoodsFromCategory(this.getCategoryIdByRoute(), this.pagination).then(data => {
          this.products = data;
        });
      }
    } else {
      if(this.searchValue != '') {
        this.goodsService.searchGoods(this.searchValue.trim(), 14, 1).then(data => {
          this.products = data;
        });
      } else {
        this.goodsService.getGoods(this.pagination).then(data => {
          this.products = data;
        });
      }
    }
  }

  showMoreProducts() {
    this.productsAmount+=14;
    this.pagination.pageSize = this.productsAmount;
    switch (this.categoryPage) {
      case 'men': this.getProducts(1); break;
      case 'women': this.getProducts(2); break;
      case 'all': this.getProducts(); break;
    };
  }

  getCategoryIdByRoute() {
    if(this.router.url == '/category/men') {
      return 1;
    } else if(this.router.url == '/category/women') {
      return 2;
    } else {
      return -1;
    }
  }
}
