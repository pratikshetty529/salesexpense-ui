import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenquickbookornormalComponent } from './openquickbookornormal.component';

describe('OpenquickbookornormalComponent', () => {
  let component: OpenquickbookornormalComponent;
  let fixture: ComponentFixture<OpenquickbookornormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenquickbookornormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenquickbookornormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
