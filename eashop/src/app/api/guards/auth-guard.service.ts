import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AccountService} from "../services/accountService";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private accountService: AccountService,
    private router: Router) {
  }

  canActivate() {
    const isLogin = this.accountService.isLoggedIn();
    if (isLogin) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
