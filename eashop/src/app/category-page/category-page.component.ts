import { Component, OnInit, EventEmitter } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {GoodsService} from "../api/services/goodsService";
import {daLocale} from "ngx-bootstrap";
import {Pagination} from "../api/models/pagination";
import {CategoryService} from "../api/services/categoryService";
import {forEach} from "@angular/router/src/utils/collection";
import {element} from "protractor";

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
  searchValue;
  activeFilter: boolean = false;
  checkboxes;
  checkedBoxes = 0;
  productsCopy;
  categoryPage;

  constructor(
    private categoryService: CategoryService,
    private goodsService: GoodsService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.categoryPage = this.getCategoryNameFromRoute();
    switch (this.categoryPage) {
      case 'men': this.getProducts(5); break;
      case 'women': this.getProducts(6); break;
      case 'all': this.getProducts(); break;
    };
    this.categoryService.getCategories().then(data => {
        this.categories = data;
    });
  }

   getCategoryNameFromRoute(){
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
      this.goodsService.getGoodsFromCategory(id).then(data => {
        this.products = data;
        console.log(this.products);
      });
    } else {
      this.goodsService.getGoods(this.pagination).then(data => {
        this.products = data;
      });
    }
  }


  doSearch(){
    if(this.searchValue != '') {
      this.goodsService.searchGoods(this.searchValue.trim(), 9, 1).then(data => {
        this.products = data;
      });
    }
  }

  showMoreProducts() {
    this.productsAmount+=6;
    this.pagination.pageSize = this.productsAmount;
    switch (this.categoryPage) {
      case 'men': this.getProducts(5); break;
      case 'women': this.getProducts(6); break;
      case 'all': this.getProducts(); break;
    };
  }
}
