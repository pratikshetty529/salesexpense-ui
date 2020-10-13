import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogboxComponentComponent } from '../dialogbox-component/dialogbox-component.component';
import  {PdfopencloseService} from '../service/pdfopenclose.service';
import {OpeningClosingErrorComponent} from '../opening-closing-error/opening-closing-error.component'
@Component({
  selector: 'app-opening-closing-validation',
  templateUrl: './opening-closing-validation.component.html',
  styleUrls: ['./opening-closing-validation.component.css']
})
export class OpeningClosingValidationComponent implements OnInit {
  public  openingBalance:  string  =  "";
  public  closingBalance:  string  =  "";
  public front : boolean;
  public validation:boolean=false;
public  back:boolean=false;
  constructor(
    private pdfopencloseService: PdfopencloseService,
    private dialogRef: MatDialogRef<DialogboxComponentComponent >,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }
  submit()
  {
     let test:any =this.pdfopencloseService.readDataFromBankStatement() 
     if (test.openingBalance===this.openingBalance && test.closingBalance===this.closingBalance)
     {
     
       this.validation=true;
       this.back=true;
         this.front=false;
         this.pdfopencloseService.masterVendorListStatus(this.back,this.front)
        this.dialogRef.close({back:true}); 
     
      }
       else if (!(test.openingBalance===this.openingBalance) || !(test.closingBalance===this.closingBalance))
      {
        const dialogRef = this.dialog.open(OpeningClosingErrorComponent)
        let instance = dialogRef.componentInstance;
        instance.text =test.closingBalance;
        this.back=false; 
      }
  }

}
