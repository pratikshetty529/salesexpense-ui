import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsUpdatedComponent } from './records-updated.component';

describe('RecordsUpdatedComponent', () => {
  let component: RecordsUpdatedComponent;
  let fixture: ComponentFixture<RecordsUpdatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordsUpdatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
