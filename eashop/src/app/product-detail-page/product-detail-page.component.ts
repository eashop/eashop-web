import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from "@angular/router";
import { Goods } from "../api/models/goods";
import { GoodsService } from "../api/services/goodsService";
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss']
})
export class ProductDetailPageComponent implements OnInit {

  product: Goods;
  constructor(
    private goodsService: GoodsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location) { }


  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const productId = +params.get('id');
      return this.goodsService.getSingleGoods(productId)
        .then((product) => {
          this.product = product;
        })
        .catch((error) => {
          console.log(error);
          return this.router.navigate(['/not-found']);
        });
    });
  }

  goOnPrevPage() {
    this.location.back();
  }
}
