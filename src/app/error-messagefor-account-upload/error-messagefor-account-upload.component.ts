import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

import { Inject } from '@angular/core';
import { DialogboxComponentComponent } from '../dialogbox-component/dialogbox-component.component';
@Component({
  selector: 'app-error-messagefor-account-upload',
  templateUrl: './error-messagefor-account-upload.component.html',
  styleUrls: ['./error-messagefor-account-upload.component.css']
})
export class ErrorMEssageforAccountUploadComponent implements OnInit {
 formattedAddresses :string[]
  constructor(   @Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<DialogboxComponentComponent >
  ) { }

  ngOnInit(): void {

  }
reset()
{
  this.dialogRef.close({  back:true});
}
}
