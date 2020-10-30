import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayNewMasterVendorsComponent } from './display-new-master-vendors.component';

describe('DisplayNewMasterVendorsComponent', () => {
  let component: DisplayNewMasterVendorsComponent;
  let fixture: ComponentFixture<DisplayNewMasterVendorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayNewMasterVendorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayNewMasterVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
