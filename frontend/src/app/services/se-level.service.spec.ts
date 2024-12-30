import { TestBed } from '@angular/core/testing';

import { SeLevelService } from './se-level.service';

describe('SeLevelService', () => {
  let service: SeLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
