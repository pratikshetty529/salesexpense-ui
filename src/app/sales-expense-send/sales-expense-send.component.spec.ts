import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesExpenseSendComponent } from './sales-expense-send.component';

describe('SalesExpenseSendComponent', () => {
  let component: SalesExpenseSendComponent;
  let fixture: ComponentFixture<SalesExpenseSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesExpenseSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesExpenseSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
