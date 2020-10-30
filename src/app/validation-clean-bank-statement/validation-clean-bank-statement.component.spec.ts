import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationCleanBankStatementComponent } from './validation-clean-bank-statement.component';

describe('ValidationCleanBankStatementComponent', () => {
  let component: ValidationCleanBankStatementComponent;
  let fixture: ComponentFixture<ValidationCleanBankStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationCleanBankStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationCleanBankStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
