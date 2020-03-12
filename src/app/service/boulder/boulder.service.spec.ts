import { TestBed } from '@angular/core/testing';

import { BoulderService } from './boulder.service';

describe('BoulderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoulderService = TestBed.get(BoulderService);
    expect(service).toBeTruthy();
  });
});
