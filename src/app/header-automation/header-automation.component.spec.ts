import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAutomationComponent } from './header-automation.component';

describe('HeaderAutomationComponent', () => {
  let component: HeaderAutomationComponent;
  let fixture: ComponentFixture<HeaderAutomationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderAutomationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderAutomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
