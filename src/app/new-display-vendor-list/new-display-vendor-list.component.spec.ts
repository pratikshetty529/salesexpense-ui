import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDisplayVendorListComponent } from './new-display-vendor-list.component';

describe('NewDisplayVendorListComponent', () => {
  let component: NewDisplayVendorListComponent;
  let fixture: ComponentFixture<NewDisplayVendorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDisplayVendorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDisplayVendorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
