import { Injectable } from '@angular/core';
import { IVendorList, Ivendor } from '../interface/IGeneratedBankStatement';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {SalesExpenseSendComponent} from '../sales-expense-send/sales-expense-send.component'
@Injectable({
  providedIn: 'root'
})
export class DisplayvendorlistService {
  public front:boolean=false;
  public apiAccountList:any[];
  public apiVendorList: any[];
  public fullAccountList:any[]
  public Opis :Ivendor[];
  public MasterVendor : any[]
  SERVER_URL=" https://salesexpense.osc-fr1.scalingo.io/salesexpense/uploaddocuments";
  public apiData: any[];
  constructor(private http:HttpClient) { }
 
  displayVendorList(res,displayflag:boolean)
  {  
    this.apiData=res;
    if (displayflag===true)
    {
    this.apiVendorList=res.vendorList; 
    this.apiAccountList=res.accountList;
this.fullAccountList=res.fullAccountList
    this.Opis=res;
    this.front=displayflag;
    return true    
    }
  };
  
  getVendorList()
  {
    return this.apiVendorList; 
  }
  displaybank()
  {
  // return this.apiVendorList;
     return this.apiData;
  }
  displayvendordata():Observable<Ivendor[]>
  {
    
    //return of (this.apiVendorList)
     return of(this.apiVendorList);
  }
  getaccountlist()
  {
    return this.apiAccountList;
  }

  getfullaccountlist()
  {
    return this.fullAccountList
  }

  getfullaccountlistfordescription()
  {
    return this.fullAccountList
  }

  getaccountlistfordescription()
  {
   return  this.apiAccountList
  }
  
  getMasterVendor(res :IVendorList[])
  {
   this.MasterVendor=res;
  }
  readMasterVendor()
  {
    return this.MasterVendor;
  }
}
