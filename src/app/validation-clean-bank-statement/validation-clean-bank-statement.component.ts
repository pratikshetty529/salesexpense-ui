import { Component, OnInit } from '@angular/core';
import {DialogboxComponentComponent} from '../dialogbox-component/dialogbox-component.component'
import { MatDialogRef } from '@angular/material/dialog'
@Component({
  selector: 'app-validation-clean-bank-statement',
  templateUrl: './validation-clean-bank-statement.component.html',
  styleUrls: ['./validation-clean-bank-statement.component.css']
})
export class ValidationCleanBankStatementComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogboxComponentComponent >,) { }
text:string;
  ngOnInit(): void {
    if (this.text){
    this.text.slice(0,-1)
  }}
reset()
{
  this.dialogRef.close();
}


}
