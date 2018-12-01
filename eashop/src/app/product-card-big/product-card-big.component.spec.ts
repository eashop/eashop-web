import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardBigComponent } from './product-card-big.component';

describe('ProductCardBigComponent', () => {
  let component: ProductCardBigComponent;
  let fixture: ComponentFixture<ProductCardBigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCardBigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardBigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
