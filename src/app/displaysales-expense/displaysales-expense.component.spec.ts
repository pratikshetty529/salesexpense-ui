import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaysalesExpenseComponent } from './displaysales-expense.component';

describe('DisplaysalesExpenseComponent', () => {
  let component: DisplaysalesExpenseComponent;
  let fixture: ComponentFixture<DisplaysalesExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaysalesExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaysalesExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
