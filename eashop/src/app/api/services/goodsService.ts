import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginModel } from '../models/loginModel';
import { API_URL, DEFAULT_USER } from '../apiConstants';
import { map } from 'rxjs/operators';
import { Observable, empty, of } from 'rxjs';
import { AccountService } from './accountService';
import { Goods } from '../models/goods';
import { Pagination } from '../models/pagination';

@Injectable()
export class GoodsService {

    constructor(private http: HttpClient, private accountService: AccountService) { }

    getGoods(pagination?: Pagination): Promise<any> {
        if (pagination) {
            return this.http.get(`${API_URL}/goods`, {
                params: {
                    pageNumber: pagination.pageNumber.toString(),
                    pageSize: pagination.pageSize.toString()

                }
            }).toPromise();
        }
        return this.http.get(`${API_URL}/goods`).toPromise();
    }

    getSingleGoods(id: number): Promise<any> {
        return this.http.get(`${API_URL}/goods/${id}`).toPromise();
    }

    async createGoods(goods: Goods): Promise<any> {
        let promise = Promise.resolve('');
        if (!this.accountService.isLoggedIn()) {
            promise = this.accountService.logIn(DEFAULT_USER);
        }
        const r = await promise;
        delete goods.id;
        return this.http.post(`${API_URL}/goods`, goods).toPromise();
    }

    async editGoods(goods: Goods): Promise<any> {
        if (!goods.id) {
            throw new Error('id is required');
        }
        let promise = Promise.resolve('');
        if (!this.accountService.isLoggedIn()) {
            promise = this.accountService.logIn(DEFAULT_USER);
        }
        const d = await promise;
        return this.http.put(`${API_URL}/goods/${goods.id}`, goods).toPromise();
    }

    async deleteGoods(id: number): Promise<any> {
        let promise = Promise.resolve();
        if (!this.accountService.isLoggedIn()) {
            promise = this.accountService.logIn(DEFAULT_USER);
        }
        const r = await promise;
        return this.http.delete(`${API_URL}/goods/${id}`).toPromise();
    }

    async getGoodsFromCategory(id: number) {
      return this.getGoods().then(data => {
        return data.filter(data => data.categoryId === id);
      });
    }
}
