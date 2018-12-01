import { Component, OnInit, EventEmitter } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {GoodsService} from "../api/services/goodsService";

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {
  productsAmount: number = 9;
  constructor(
    private goodsService: GoodsService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.checkRoute();
  }

  checkRoute(){ }

}
