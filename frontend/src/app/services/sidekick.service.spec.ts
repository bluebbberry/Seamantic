import { TestBed } from '@angular/core/testing';

import { SidekickService } from './sidekick.service';

describe('SidekickService', () => {
  let service: SidekickService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidekickService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
