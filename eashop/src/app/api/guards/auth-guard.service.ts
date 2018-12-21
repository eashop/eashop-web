import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AccountService} from "../services/accountService";


@Injectable()
export class AuthGuard implements CanActivate {
  isLogin;
  isAdmin;
  constructor(
    private accountService: AccountService,
    private router: Router) {
  }

  canActivate() {
    this.isLogin = sessionStorage.getItem("loggedIn");
    this.isAdmin = sessionStorage.getItem("isAdmin");
    if (this.isLogin===true && this.isAdmin===true) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
