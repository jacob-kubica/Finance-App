import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRepaymentComponent } from './card-repayment.component';

describe('CardRepaymentComponent', () => {
  let component: CardRepaymentComponent;
  let fixture: ComponentFixture<CardRepaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardRepaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardRepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
