import { TestBed } from '@angular/core/testing';

import { AccessGaleryService } from './access-galery.service';

describe('AccessGaleryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccessGaleryService = TestBed.get(AccessGaleryService);
    expect(service).toBeTruthy();
  });
});
