import { Injectable } from '@angular/core';
import {PdfUploadComponent} from '../pdf-upload/pdf-upload.component'
import { IDisplayVendorDropdown, IGeneratedBankStatement, ICleanedBankStatementcontents, Sales} from '../interface/IGeneratedBankStatement'
@Injectable({
  providedIn: 'root'
})
export class PdfopencloseService {
  public CleanedBankStatement: IGeneratedBankStatement[];
  public closeBalanceStatementValidation: boolean;
  public  BanksStatement:boolean;
  public dtableData: ICleanedBankStatementcontents[];
  public processedCleanandBankStatement:ICleanedBankStatementcontents[];
  public newVendorList:ICleanedBankStatementcontents[];
  public DisplaydataforBank :ICleanedBankStatementcontents[]
  public ReadSales:any[];
  public ReadExpense:any[];
  constructor() { }

  sendDataForValidation(res)
  {
 this.CleanedBankStatement=res;  debugger;
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

  sendDatatoDropdown(row : ICleanedBankStatementcontents[])
  {
    this.dtableData= row;
  }
  readDataFromDropdown()
  {
    return this.dtableData;
  }
  sendNewDataofVendors(res: ICleanedBankStatementcontents[])
  {
   this.newVendorList=res;

  }
  readNewDataofVendors()
  {
    return this.newVendorList;
  }

  sendDataToSalesAndExpense(res:ICleanedBankStatementcontents[])
  {
   this.processedCleanandBankStatement=res;
   
  }
  readDataToSalesAndExpense()
  {
  return this.processedCleanandBankStatement;
  }

  FetchDataToSales(res:any[])
  {
this.ReadSales=res;
  }
  ReadDataToSales()
  {
return this.ReadSales
  }
  FetchDataToExpense(res:any[])
  {
    this.ReadExpense=res;

  }
  ReadDataToExpense()
  {
return this.ReadExpense;
  }
}
