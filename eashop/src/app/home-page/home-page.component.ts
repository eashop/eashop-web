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

  viewMorePath = '/category'
  productsAmount: number = 12;
  constructor() { }

  ngOnInit() { }
}
