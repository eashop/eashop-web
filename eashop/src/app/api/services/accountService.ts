import {Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginModel } from '../models/loginModel';
import { API_URL } from '../apiConstants';
import { catchError, map } from 'rxjs/internal/operators';
import { throwError, Observable } from 'rxjs';

@Injectable()
export class AccountService {
    private loggedIn = false;
    private isAdmin = false;

    constructor(private http: HttpClient) {}

    isLoggedIn(): boolean {
        return this.loggedIn;
    }

    async logIn(data: LoginModel): Promise<any> {
        const promise = this.http.post(`${API_URL}/Account/Login`, data).toPromise();
        const res = await promise;
        this.loggedIn = true;
        if (res) {
            this.isAdmin = true;
        }
        return res;
    }
}
