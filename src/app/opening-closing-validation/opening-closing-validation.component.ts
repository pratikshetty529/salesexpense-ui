import { Component, OnInit } from '@angular/core';
import  {PdfopencloseService} from '../service/pdfopenclose.service';
//import {GeneratedBankStatement} from '../model/GeneratedBankStatement';
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
    private pdfopencloseService: PdfopencloseService
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
      }
       else if (!(test.openingBalance===this.openingBalance) && !(test.closingBalance===this.closingBalance))
      {
       this.back=false;
      }
  }
  ngOnDestroy()
  {

  }
  reset()
  {
    
  }
}
