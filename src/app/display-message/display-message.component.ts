import { Component, OnInit, Inject, Injectable } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
@Component({
  selector: 'app-display-message',
  //templateUrl: './display-message.component.html',
  templateUrl: 'display-message.component.html',
  styleUrls: ['./display-message.component.css']
})
export class DisplayMessageComponent  {

  constructor(private  dialogRef:  MatDialogRef<DisplayMessageComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any) {
  }
  public  closeMe() {
    this.dialogRef.close();
}

  ngOnInit(): void {
  }

}
