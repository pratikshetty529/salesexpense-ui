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
  public DisplayDataForDescription:ICleanedBankStatementcontents[]
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
    this.DisplaydataforBank.forEach(element => { 
      
    });
    return this.DisplaydataforBank;
  }

  senddataforDescription(res:ICleanedBankStatementcontents[])
  {
this.DisplayDataForDescription=res;
  }
  readdataforDescription()
  {
    return this.DisplayDataForDescription;
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
  sendDataForEditing(row:ICleanedBankStatementcontents[])
  {
    this.dtableData=row;

  }
  readDataForEditing()
  {
    return this.dtableData;
  }
  updatedataAfterEdition(row : ICleanedBankStatementcontents[])
  {
this.dtableData=row;
  }
  readdataAfterEdition(row:ICleanedBankStatementcontents[])
  {
    return this.dtableData;
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
  CompletedataofCleaneDBankstatement(res:ICleanedBankStatementcontents[])
  {
this.dtableData=res;
  }
  readcompletedataofCleanedBankStatement()
  {
    return this.dtableData;
  }
}
