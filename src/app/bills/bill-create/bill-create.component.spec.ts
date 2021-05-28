import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillCreateComponent } from './bill-create.component';

describe('BillCreateComponent', () => {
  let component: BillCreateComponent;
  let fixture: ComponentFixture<BillCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
