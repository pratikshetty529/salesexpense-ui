import { Injectable } from '@angular/core';
import {PdfUploadComponent} from '../pdf-upload/pdf-upload.component'
import { IDisplayVendorDropdown, IGeneratedBankStatement, ICleanedBankStatementcontents} from '../interface/IGeneratedBankStatement'
@Injectable({
  providedIn: 'root'
})
export class PdfopencloseService {
  public CleanedBankStatement: IGeneratedBankStatement[];
  public closeBalanceStatementValidation: boolean;
  public  BanksStatement:boolean;
  public DisplaydataforBank :ICleanedBankStatementcontents[]
  constructor() { }

  sendDataForValidation(res)
  {
 this.CleanedBankStatement=res;
 this.DisplaydataforBank=res.cleanedBankStatement
 return true;
  }

  readDataFromBankStatement()
  {
    return this.CleanedBankStatement;
  }

  displayDataForBankStatement()
  {
    return this.DisplaydataforBank;
  }

  masterVendorListStatus(statusBankStatement: boolean,statuscloseBankStatement : boolean) 
  {
 this.BanksStatement=statusBankStatement;
 this.closeBalanceStatementValidation=statuscloseBankStatement;

  }

  sendDatatoDropdown(res,vendorlist)
  {
    
  }

}
