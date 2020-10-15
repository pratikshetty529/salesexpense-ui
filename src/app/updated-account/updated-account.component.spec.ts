import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedAccountComponent } from './updated-account.component';

describe('UpdatedAccountComponent', () => {
  let component: UpdatedAccountComponent;
  let fixture: ComponentFixture<UpdatedAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatedAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
