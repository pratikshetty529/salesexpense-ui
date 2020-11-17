import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {DisplayvendorlistService} from '../service/displayvendorlist.service'
import {PdfopencloseService} from '../service/pdfopenclose.service';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ICleanedBankStatementcontents } from '../interface/IGeneratedBankStatement';
import { HttpClient} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadFailureComponent } from '../file-upload-failure/file-upload-failure.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sales-expense-send',
  templateUrl: './sales-expense-send.component.html',
  styleUrls: ['./sales-expense-send.component.css']
})
export class SalesExpenseSendComponent implements OnInit {
  public Opis :string[];
  public  sales:  string  =  "";
  public expense:string="";
  public yourOption:string="";
public filteredOpis$ :  Observable<string[]>;
public filteredOp$: Observable<string[]>;
displaydropdownvalue:string;
public front:boolean=false;
public back:boolean=false
public accountlistnames:any[]
public accountnames:string="";
public CleanedBankStatement:any[]
  constructor(private displayvendorlistservice:DisplayvendorlistService,
  private  pdfopeencloseservice:PdfopencloseService,
  private httpClient: HttpClient,
  public dialog: MatDialog,
  private router:Router) { }
  myControl = new FormControl();
  public salesList:any[];
  public displaySales:boolean=false;
  public displayExpense:boolean=false;
  public expenseList:any[];
  public displaybutton: boolean=false;
  ngOnInit(): void {  
    this.accountlistnames=this.displayvendorlistservice.getaccountlist();
    this.filteredOpis$=this.myControl.valueChanges.
 pipe(startWith(''),
 map(value => this._filter(value)))
 let test=this.displayvendorlistservice.getaccountlist();
 
  }

test()
{
  this.accountlistnames=this.displayvendorlistservice.getaccountlist();
}
   _filter(value: string): string[] {
    if(value) { 
      this.Opis=this.displayvendorlistservice.getaccountlist();
      const filteredSet = this.Opis.filter(option => option.toLowerCase().includes(value));
      return filteredSet;
    }
    else {
      return []
  
  }
 
}
reload()
{
  
this.router.navigate(['quickbook'])
window.location.reload();
}
  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
   this.displaydropdownvalue=event.option.value;
  
    }
    
  displayFn(vendor?: any): string | undefined {
    return vendor ? vendor: undefined; debugger;
  }

  submit()
  {
   //let testing:string= this.accountnames
    let test=this.pdfopeencloseservice.readDataFromBankStatement();
let xyz=test['openingBalance']
let abc=test['closingBalance']
    let newArray:ICleanedBankStatementcontents[];
    this.CleanedBankStatement=this.pdfopeencloseservice.readDataToSalesAndExpense().map(
      x=>{
        return{
        account:x.account,
        amount:x.amount,
        date : x.date,
        description : x.description,
        vendor:x.vendor
        }
      }
    
    )  
    {
      var node_form_data2 = ({
        'openingBalance': xyz,
        'closingBalance':abc,
        'cleanedBankStatement':this.CleanedBankStatement
    });

      var node_form_data = ({
        'bankName': this.accountnames,
        'salesReffNumber':this.sales,
        'expenseReffNumber': this.expense,
        'bankStatement':node_form_data2
    });
    debugger;
    
    this.httpClient.post<any>('https://salesexpense.herokuapp.com/salesexpense/generatesalesexpense', node_form_data).subscribe(  
      (res) =>  this.displayvendor(res) ,
      (err) => this.displayerror(err)
    )
  }


}
displayvendor(res:any)
{
  this.pdfopeencloseservice.FetchDataToExpense(res.expense)
this.pdfopeencloseservice.FetchDataToSales(res.sales);
this.displaybutton=true;
}
displayerror(err)
{
  const dialogRef = this.dialog.open(FileUploadFailureComponent)
  let instance = dialogRef.componentInstance;
  instance.text ='Geneation of Sales and Expense failed';
}
viewSales()
{
  this.displaySales=true;
  this.front=true;
  this.back=false;

}
viewExpense()
{
  this.displayExpense=true;
  this.back=true;
  this.front=false;
}
}
