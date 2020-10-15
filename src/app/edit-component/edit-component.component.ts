import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogboxComponentComponent } from '../dialogbox-component/dialogbox-component.component';
import { FileUploadFailureComponent } from '../file-upload-failure/file-upload-failure.component';
import { ICleanedBankStatementcontents } from '../interface/IGeneratedBankStatement';
import { PdfopencloseService } from '../service/pdfopenclose.service';

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.css']
})
export class EditComponentComponent  {
account:string;
oldAccount:string;
  constructor(private pdfOpenCloseService:PdfopencloseService,
    private dialogRef: MatDialogRef<DialogboxComponentComponent >,public dialog : MatDialog) { }

  ngOnInit(): void {
    this.account= this.pdfOpenCloseService.readDataForEditing()["account"];
    this.oldAccount=this.account;
  }
  doAction()
  {
let olderAccount=this.oldAccount
if (this.pdfOpenCloseService.readDataForEditing()["vendor"]!="")
{
  
this.pdfOpenCloseService.readDataForEditing()["account"]=this.account;
let data :ICleanedBankStatementcontents[]=this.pdfOpenCloseService.readDataForEditing()
this.dialogRef.close({data,olderAccount})
} 
else 
{
  const dialogRef = this.dialog.open(FileUploadFailureComponent)
  let instance = dialogRef.componentInstance;
  instance.text ='User need to click on pop up button';
}
}
  closeDialog()
  {
this.dialogRef.close();
  }
}
