import { TestBed } from '@angular/core/testing';

import { WishService } from './wish.service';

describe('WishService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WishService = TestBed.get(WishService);
    expect(service).toBeTruthy();
  });
});
