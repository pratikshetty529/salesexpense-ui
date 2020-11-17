import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMEssageforAccountUploadComponent } from './error-messagefor-account-upload.component';

describe('ErrorMEssageforAccountUploadComponent', () => {
  let component: ErrorMEssageforAccountUploadComponent;
  let fixture: ComponentFixture<ErrorMEssageforAccountUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorMEssageforAccountUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMEssageforAccountUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
