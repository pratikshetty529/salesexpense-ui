import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogboxComponentComponent } from './dialogbox-component.component';

describe('DialogboxComponentComponent', () => {
  let component: DialogboxComponentComponent;
  let fixture: ComponentFixture<DialogboxComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogboxComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogboxComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
