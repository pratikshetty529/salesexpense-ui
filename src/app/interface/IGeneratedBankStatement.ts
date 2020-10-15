export interface IGeneratedBankStatement {
    openingBalance: number;
    closingBalance: number;
    cleanedBankStatement: string[];  
  }

  export interface IDisplayVendorDropdown{
    name: string;
    account: string
  }

  export interface ICleanedBankStatementcontents {
    date: string;
    description:string;
    amount:string;
    vendor:string;
    account:string;
    flag:string;
    newFlag:string;
  }

  export interface IVendorList {
    name:string;
    vendorName:string;
  }

  export interface Ivendor{
    name:string,
    count:number[],
    account:string[]
  } 
  export interface Sales{
    account:string;
amount:string;
bank:string;
date:string;
description:string;
payee:string;
reff:string;
toBePrinted:string;
  }