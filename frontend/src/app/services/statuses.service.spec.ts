import { TestBed } from '@angular/core/testing';

import { StatusesService } from './statuses.service';

describe('StatusesService', () => {
  let service: StatusesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
