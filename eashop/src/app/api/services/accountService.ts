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

    constructor(private http: HttpClient) {
      this.loggedIn = false;
      this.isAdmin = false;
    }

    isLoggedIn() {
        return new Promise( () => {
          return this.loggedIn;
        });
    }

     logIn(data): Observable<any> {
        return this.http.post(`${API_URL}/Account/login`, data);
    }

    logOut() {
      this.http.post(`${API_URL}/Account/logout`, {}).subscribe();
      sessionStorage.removeItem('isAdmin');
      sessionStorage.removeItem('isLoggedIn');
    }

    setAdmin(value: boolean) {
      this.isAdmin = value;
      sessionStorage.setItem('isAdmin', `${value}`);
    }

    setLoggedIn(value: boolean) {
      this.loggedIn = value;
      sessionStorage.setItem('isLoggedIn', `${value}`);
    }
}
