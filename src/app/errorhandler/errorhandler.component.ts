 import { Component, OnInit } from '@angular/core';
 import { MatDialogRef } from '@angular/material/dialog'
 import {DialogboxComponentComponent} from '../dialogbox-component/dialogbox-component.component'
@Component({
  selector: 'app-errorhandler',
  templateUrl: './errorhandler.component.html',
  styleUrls: ['./errorhandler.component.css']
})
export class ErrorhandlerComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogboxComponentComponent >) { }

  ngOnInit(): void {
  }
  reset()
  {
    this.dialogRef.close();
  }
}
