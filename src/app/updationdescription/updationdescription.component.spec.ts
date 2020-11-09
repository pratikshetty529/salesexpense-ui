import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdationdescriptionComponent } from './updationdescription.component';

describe('UpdationdescriptionComponent', () => {
  let component: UpdationdescriptionComponent;
  let fixture: ComponentFixture<UpdationdescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdationdescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdationdescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
