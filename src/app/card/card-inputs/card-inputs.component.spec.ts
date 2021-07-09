import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInputsComponent } from './card-inputs.component';

describe('CardInputsComponent', () => {
  let component: CardInputsComponent;
  let fixture: ComponentFixture<CardInputsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardInputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
