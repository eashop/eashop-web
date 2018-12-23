import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AccountService} from "../api/services/accountService";
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product;
  isAdmin;
  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.isAdmin = sessionStorage.getItem("isLoggedIn") && sessionStorage.getItem("isAdmin");
  }

}
