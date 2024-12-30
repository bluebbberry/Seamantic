import { TestBed } from '@angular/core/testing';

import { DolphinService } from './dolphin.service';

describe('DolphinService', () => {
  let service: DolphinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DolphinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
