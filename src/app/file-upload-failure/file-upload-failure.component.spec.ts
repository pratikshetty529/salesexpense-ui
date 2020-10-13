import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadFailureComponent } from './file-upload-failure.component';

describe('FileUploadFailureComponent', () => {
  let component: FileUploadFailureComponent;
  let fixture: ComponentFixture<FileUploadFailureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadFailureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
