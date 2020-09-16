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
  }

  export interface IVendorList {
    name:string;
  }

  export interface Ivendor{
    name:string,
    count:number[],
    account:string[]
  } 