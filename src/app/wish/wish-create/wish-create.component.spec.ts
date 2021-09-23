import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishCreateComponent } from './wish-create.component';

describe('WishCreateComponent', () => {
  let component: WishCreateComponent;
  let fixture: ComponentFixture<WishCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
