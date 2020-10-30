import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningDropdownComponent } from './opening-dropdown.component';

describe('OpeningDropdownComponent', () => {
  let component: OpeningDropdownComponent;
  let fixture: ComponentFixture<OpeningDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpeningDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
