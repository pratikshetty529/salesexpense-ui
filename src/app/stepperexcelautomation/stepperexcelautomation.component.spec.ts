import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperexcelautomationComponent } from './stepperexcelautomation.component';

describe('StepperexcelautomationComponent', () => {
  let component: StepperexcelautomationComponent;
  let fixture: ComponentFixture<StepperexcelautomationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepperexcelautomationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperexcelautomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
