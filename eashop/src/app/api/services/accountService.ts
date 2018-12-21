import {Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginModel } from '../models/loginModel';
import {API_URL, DEFAULT_USER} from '../apiConstants';
import { catchError, map } from 'rxjs/internal/operators';
import { throwError, Observable } from 'rxjs';

@Injectable()
export class AccountService {
    private loggedIn = false;
    private isAdmin = false;

    constructor(private http: HttpClient) {}

    isLoggedIn() {
        return new Promise(() => {
          return this.loggedIn;
        });
    }

    async logIn(data): Promise<any> {
        this.loggedIn = true;
        if (data.login === DEFAULT_USER.email && DEFAULT_USER.password === data.password) {
            this.isAdmin = true;
        }
        sessionStorage.setItem('isAdmin', `${this.isAdmin}`);
        sessionStorage.setItem('loggedIn', `${this.loggedIn}`);
    }
}
