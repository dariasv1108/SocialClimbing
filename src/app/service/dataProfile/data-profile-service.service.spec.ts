import { TestBed } from '@angular/core/testing';

import { DataProfileServiceService } from './data-profile-service.service';

describe('DataProfileServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataProfileServiceService = TestBed.get(DataProfileServiceService);
    expect(service).toBeTruthy();
  });
});
