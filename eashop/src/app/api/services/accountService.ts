import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { LoginModel } from '../models/loginModel';
import {API_URL, DEFAULT_USER} from '../apiConstants';
import { catchError, map } from 'rxjs/internal/operators';
import { throwError, Observable } from 'rxjs';

@Injectable()
export class AccountService {
    private loggedIn = false;
    private isAdmin = false;
    private headers;

    constructor(private http: HttpClient) {
      this.loggedIn = false;
      this.isAdmin = false;
      this.headers = new HttpHeaders ({
          'Access-Control-Request-Method': ,
          'Access-Control-Request-Headers': 'origin',
          'Origin': 'https://foo.bar.org'
      });
    }

    isLoggedIn() {
        return new Promise( () => {
          return this.loggedIn;
        });
    }

    async logIn(data): Promise<any> {
        return this.http.post(`${API_URL}/Account/login`, data).toPromise();
        // this.loggedIn = true;
        // if (data.login === DEFAULT_USER.email && DEFAULT_USER.password === data.password) {
        //     this.isAdmin = true;
        // }
        // sessionStorage.setItem('isAdmin', `${this.isAdmin}`);
        // sessionStorage.setItem('loggedIn', `${this.loggedIn}`);
    }
}
