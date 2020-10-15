import { Component, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogboxComponentComponent } from '../dialogbox-component/dialogbox-component.component';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-updated-account',
  templateUrl: './updated-account.component.html',
  styleUrls: ['./updated-account.component.css']
})
export class UpdatedAccountComponent implements OnInit {
records:string;
back:boolean=false;
  constructor(private dialogRef: MatDialogRef<DialogboxComponentComponent >,
    @Inject(MAT_DIALOG_DATA) public data: any
) { }

  ngOnInit(): void {
    this.records=this.data
  }
  doAction()
  {
    let back:boolean=true;
    this.dialogRef.close({back})
  }
  closeDialog()
  {
    this.back=false;
this.dialogRef.close();
  }
}
