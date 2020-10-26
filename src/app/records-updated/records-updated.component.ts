import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogboxComponentComponent } from '../dialogbox-component/dialogbox-component.component';

@Component({
  selector: 'app-records-updated',
  templateUrl: './records-updated.component.html',
  styleUrls: ['./records-updated.component.css']
})
export class RecordsUpdatedComponent implements OnInit {
text:string;
  constructor(private dialogRef: MatDialogRef<DialogboxComponentComponent >,) { }

  ngOnInit(): void {
  }
  reset()
  {
    this.dialogRef.close()
  }
}
