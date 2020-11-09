import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningClosingValidationComponent } from './opening-closing-validation.component';

describe('OpeningClosingValidationComponent', () => {
  let component: OpeningClosingValidationComponent;
  let fixture: ComponentFixture<OpeningClosingValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpeningClosingValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningClosingValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
