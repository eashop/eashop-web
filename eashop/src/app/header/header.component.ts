import {Component, HostListener, OnInit} from '@angular/core';
import {AccountService} from "../api/services/accountService";
import {Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    '(window:resize)': 'onResize()'
  }
})

export class HeaderComponent implements OnInit {
  isMobile;
  authorizationButtonText: string ;
  isLoggedIn;
  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
    this.isMobile = this.checkIfMobile();
  }

  onResize() {
    this.isMobile = this.checkIfMobile();
  }

  checkIfMobile() {
    if(window.innerWidth <= 991) {
      return true;
    }
  }

  navigateToAuthorizationPage() {
    sessionStorage.getItem("isLoggedIn") ? this.accountService.logOut() :
                                        this.router.navigate(['/login']);
  }
}
