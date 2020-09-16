import { TestBed } from '@angular/core/testing';

import { DropdowndialogService } from './dropdowndialog.service';

describe('DropdowndialogService', () => {
  let service: DropdowndialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DropdowndialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
