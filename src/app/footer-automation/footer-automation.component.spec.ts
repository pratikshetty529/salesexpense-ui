import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterAutomationComponent } from './footer-automation.component';

describe('FooterAutomationComponent', () => {
  let component: FooterAutomationComponent;
  let fixture: ComponentFixture<FooterAutomationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterAutomationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterAutomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
