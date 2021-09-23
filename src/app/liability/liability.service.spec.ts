import { TestBed } from '@angular/core/testing';

import { LiabilityService } from './liability.service';

describe('LiabilityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LiabilityService = TestBed.get(LiabilityService);
    expect(service).toBeTruthy();
  });
});
