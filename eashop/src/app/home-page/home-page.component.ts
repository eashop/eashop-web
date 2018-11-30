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

  constructor(private goodsService: GoodsService) { }

  ngOnInit() {
    //retrieving goods
    /*this.goodsService.getGoods()
    .then((r: Array<Goods>) => {
      debugger;
      const pagination = new Pagination(2, 12);
      return this.goodsService.getGoods(pagination);
    })
    .then((r: Array<Goods>) => {
      debugger;
      return this.goodsService.getSingleGoods(1);
    })
    .then((r: Goods) => {
      debugger;
    });*/

    // creating, editing, deleting
    /*const goods = new Goods();
    goods.active = true;
    goods.categoryId = 3;
    goods.description = 'qwe';
    goods.image = 'hhhh';
    goods.name = 'testGoods';
    goods.price = 4000;
    goods.size = 'xl';
    this.goodsService.createGoods(goods)
      .then((r: Goods) => {
        debugger;
        goods.id = r.id;
        goods.size = 'l';
        goods.price = 2200;
        return this.goodsService.editGoods(goods);
      })
      .then((r) => {
        debugger;
        return this.goodsService.deleteGoods(goods.id);
      })
      .then((r: Goods) => {
        debugger;
      });*/
  }
}
