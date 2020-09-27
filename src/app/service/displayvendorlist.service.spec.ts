import { TestBed } from '@angular/core/testing';

import { DisplayvendorlistService } from './displayvendorlist.service';

describe('DisplayvendorlistService', () => {
  let service: DisplayvendorlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayvendorlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
