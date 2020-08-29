import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisplayvendorlistService {

  public apiVendorList: any[];
  constructor() { }
  displayVendorList(res)
  {  
    this.apiVendorList=res; debugger;

  };
  
  getVendorList()
  {
    return this.apiVendorList; debugger;
  }
}
