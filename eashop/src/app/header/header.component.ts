import {Component, HostListener, OnInit} from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})

export class HeaderComponent implements OnInit {
  isMobile;

  constructor() { }

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

}
