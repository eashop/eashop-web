import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  slides;
  constructor() { }

  ngOnInit() {
    this.slides = [
      "slide1",
      "slide2",
      "slide3",
    ]
  }

}
