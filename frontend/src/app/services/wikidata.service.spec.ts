import { TestBed } from '@angular/core/testing';

import { WikidataService } from './wikidata.service';

describe('WikidataService', () => {
  let service: WikidataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WikidataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
