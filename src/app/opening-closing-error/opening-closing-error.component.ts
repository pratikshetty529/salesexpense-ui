 import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogboxComponentComponent } from '../dialogbox-component/dialogbox-component.component';

@Component({
  selector: 'app-opening-closing-error',
  templateUrl: './opening-closing-error.component.html',
  styleUrls: ['./opening-closing-error.component.css']
})
export class OpeningClosingErrorComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogboxComponentComponent >,) { }
  text:string;
  ngOnInit(): void {
  }
  reset()
  {
    this.dialogRef.close();
  }
}
