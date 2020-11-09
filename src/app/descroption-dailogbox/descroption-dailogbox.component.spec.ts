import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescroptionDailogboxComponent } from './descroption-dailogbox.component';

describe('DescroptionDailogboxComponent', () => {
  let component: DescroptionDailogboxComponent;
  let fixture: ComponentFixture<DescroptionDailogboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescroptionDailogboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescroptionDailogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
