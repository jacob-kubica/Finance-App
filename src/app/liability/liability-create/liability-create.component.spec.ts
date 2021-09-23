import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiabilityCreateComponent } from './liability-create.component';

describe('LiabilityCreateComponent', () => {
  let component: LiabilityCreateComponent;
  let fixture: ComponentFixture<LiabilityCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiabilityCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiabilityCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
