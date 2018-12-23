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

    constructor(private http: HttpClient) { }

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

     createGoods(goods: Goods): Observable<any> {
        return this.http.post(`${API_URL}/goods`, goods);
    }

    editGoods(goods: Goods): Observable<any> {
        return this.http.put(`${API_URL}/goods/${goods.id}`, goods);
    }

    async deleteGoods(id: number): Promise<any> {
        return this.http.delete(`${API_URL}/goods/${id}`).toPromise();
    }

    getGoodsFromCategory(id: number, pagination? :Pagination) {
      return this.http.get(`${API_URL}/Categories/${id}/goods?PageSize=${pagination.pageSize}&PageNumber=${pagination.pageNumber}`);
    }

    async searchGoods(name: string, pageSize: number, pageNumber: number, categoryId?: number): Promise<any> {
      if(categoryId) {
        return this.http.post(`${API_URL}/Goods/search`, {name, categoryId, pageSize, pageNumber}).toPromise();
      } else {
        return this.http.post(`${API_URL}/Goods/search`, {name, pageSize, pageNumber}).toPromise();
      }

    }
}
