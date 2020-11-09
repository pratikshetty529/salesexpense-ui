import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayNewVendorsComponent } from './display-new-vendors.component';

describe('DisplayNewVendorsComponent', () => {
  let component: DisplayNewVendorsComponent;
  let fixture: ComponentFixture<DisplayNewVendorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayNewVendorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayNewVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
