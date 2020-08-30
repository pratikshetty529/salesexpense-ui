import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisplayvendorlistService {
  public front:boolean=false;
  public apiVendorList: any[];
  constructor() { }
  displayVendorList(res,displayflag:boolean)
  {  
    this.apiVendorList=res.vendorList; debugger;
    this.front=displayflag;
    return true
  };
  
  getVendorList()
  {
    return this.apiVendorList; debugger;
  }
}
