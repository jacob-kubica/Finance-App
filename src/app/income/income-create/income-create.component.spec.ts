import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeCreateComponent } from './income-create.component';

describe('IncomeCreateComponent', () => {
  let component: IncomeCreateComponent;
  let fixture: ComponentFixture<IncomeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
