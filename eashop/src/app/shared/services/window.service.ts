import { Injectable, Inject } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import { pluck } from 'rxjs/internal/operators';
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";

export class WindowService {
  // width$;
  //
  // constructor(){
  //   let windowSize$ = new BehaviorSubject(this.getWindowWidth());
  //
  //   this.width$ = (windowSize$.pluck('height') as Observable<number>).distinctUntilChanged();
  //
  //   Observable.fromEvent(window, 'resize')
  //     .map(this.getWindowWidth())
  //     .subscribe(windowSize$);
  }

  // ngOnInit() {}
  //
  // getWindowWidth () {
  //   return {
  //     width: window.innerWidth
  //   }
  // }
}
