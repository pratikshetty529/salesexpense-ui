import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCleanedBankStatementComponent } from './display-cleaned-bank-statement.component';

describe('DisplayCleanedBankStatementComponent', () => {
  let component: DisplayCleanedBankStatementComponent;
  let fixture: ComponentFixture<DisplayCleanedBankStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayCleanedBankStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCleanedBankStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
