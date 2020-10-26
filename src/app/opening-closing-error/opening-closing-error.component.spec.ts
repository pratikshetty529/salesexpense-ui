import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningClosingErrorComponent } from './opening-closing-error.component';

describe('OpeningClosingErrorComponent', () => {
  let component: OpeningClosingErrorComponent;
  let fixture: ComponentFixture<OpeningClosingErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpeningClosingErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningClosingErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
