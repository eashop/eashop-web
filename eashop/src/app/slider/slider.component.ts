import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  slides;
  constructor() { }

  ngOnInit() {
    this.slides = [
        "../../assets/images/slide1.jpg",
        "../../assets/images/slide2.jpg",
        "../../assets/images/slide3.jpg",
    ]
  }

}
