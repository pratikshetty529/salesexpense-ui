import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompletePopupComponent } from './autocomplete-popup.component';

describe('AutocompletePopupComponent', () => {
  let component: AutocompletePopupComponent;
  let fixture: ComponentFixture<AutocompletePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompletePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompletePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
