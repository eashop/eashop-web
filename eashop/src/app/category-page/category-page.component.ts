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
      if(this.checkedBoxes > 1) {
        this.productsCopy = this.products.slice();
      }
      this.goodsService.getGoodsFromCategory(id).then(data => {
        this.products = data;
        if(this.productsCopy){
          this.productsCopy.forEach(product => {
            this.products.push(product);
          });
        }
        this.productsAmount = this.products.length;
        this.pagination.pageSize = this.productsAmount;
        console.log(this.products);
      });
    } else {
      this.productsAmount = 9;
      this.pagination.pageSize = this.productsAmount;
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

  checkCheckBoxvalue(event, categoryId) {
    if(event.target.checked) {
      this.checkFilter();
      this.getProducts(categoryId);
    } else {
      if(!this.checkFilter()) {
        this.activeFilter = false;
        switch (this.categoryPage) {
          case 'men': this.getProducts(5); break;
          case 'women': this.getProducts(6); break;
          case 'all': this.getProducts(); break;
        };
      } else {
        this.activeFilter = true;
        this.removeProductsByCategoryId(categoryId);
      }
    }
  }

  checkFilter(){
    this.checkedBoxes = 0;
    this.checkboxes = document.querySelectorAll('.form-check-input');
    for (let i = 0; i < this.checkboxes.length; i++) {
      if(this.checkboxes[i].checked) {
        this.checkedBoxes++;
      }
    }
    return this.checkedBoxes > 0 ? true : false;
  }

  removeProductsByCategoryId(id){
    console.log(this.products);
    for(let i=0; i<this.products.length; i++) {
      if(this.products[i].categoryId == id) {
        this.products.splice(i, 1);
      }
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
