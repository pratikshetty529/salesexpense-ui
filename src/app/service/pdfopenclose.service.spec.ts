import { TestBed } from '@angular/core/testing';

import { PdfopencloseService } from './pdfopenclose.service';

describe('PdfopencloseService', () => {
  let service: PdfopencloseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfopencloseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
