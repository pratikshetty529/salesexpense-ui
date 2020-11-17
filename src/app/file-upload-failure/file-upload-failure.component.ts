import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogboxComponentComponent } from '../dialogbox-component/dialogbox-component.component';

@Component({
  selector: 'app-file-upload-failure',
  templateUrl: './file-upload-failure.component.html',
  styleUrls: ['./file-upload-failure.component.css']
})
export class FileUploadFailureComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogboxComponentComponent >,) { }
text:string;
  ngOnInit(): void {
  }
reset()
{
  this.dialogRef.close();
}
}
