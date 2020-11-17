 import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, COMPILER_OPTIONS} from '@angular/core';
import {IGeneratedBankStatement} from '../interface/GeneratedBankStatement'
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {PdfopencloseService} from '../service/pdfopenclose.service';
import {DisplayvendorlistService} from '../service/displayvendorlist.service';
import { Observable, Subject } from 'rxjs';
import {MatRadioChange, MatRadioModule} from '@angular/material/radio'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {IDisplayVendorDropdown, ICleanedBankStatementcontents, IVendorList, Ivendor} from '../interface/IGeneratedBankStatement';
import { startWith, map } from 'rxjs/operators';
import * as rxjsOps from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {cObject,ObjectEditStatus} from '../cTableDataSource';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AutocompletePopupComponent } from '../autocomplete-popup/autocomplete-popup.component';
import * as XLSX from 'xlsx';
import { HttpClient} from '@angular/common/http';
import {ValidationCleanBankStatementComponent} from '../validation-clean-bank-statement/validation-clean-bank-statement.component'
import { EditComponentComponent } from '../edit-component/edit-component.component';
import { DisplayNewVendorsComponent } from '../display-new-vendors/display-new-vendors.component';
import { FileUploadFailureComponent } from '../file-upload-failure/file-upload-failure.component';
import { DescroptionDailogboxComponent } from '../descroption-dailogbox/descroption-dailogbox.component';
import { MatSelect } from '@angular/material/select';
import { CONTENT_ATTR } from '@angular/compiler';
@Component({
  selector: 'app-display-cleaned-bank-statement',
  templateUrl: './display-cleaned-bank-statement.component.html',
  styleUrls: ['./display-cleaned-bank-statement.component.css']
})
export class DisplayCleanedBankStatementComponent  {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @ViewChild('table') table: MatTable<cObject>;
  @ViewChild('table') table:ElementRef ;
  dataSource = new MatTableDataSource<ICleanedBankStatementcontents>();
  pageOfItems: Array<any>;
  myControl = new FormControl();
  itemClassControl = new FormControl();
  @ViewChild('myDiv') myDiv: ElementRef<HTMLElement>;
  patientCartegory : FormGroup;
  public vendor:string;
  public currentRow:ICleanedBankStatementcontents;
  config: MatDialogConfig = {
    disableClose: false,
    hasBackdrop: true,
    backdropClass: '',
    width: '600px',
    height: '',
    position: {
        top: '1%',
        bottom: '',
        left: '35%',
        right: '25%'
    }
};
  displayedColumns = [ 'date', 'description', 'amount', 'vendor','account','Flag'];
  constructor(private pdfopencloseService: PdfopencloseService,
    private displayvendorlistService: DisplayvendorlistService,
    private fb:FormBuilder,
    //public searchkey:string,
    public dialog: MatDialog,  private httpClient: HttpClient,
    private changeDetectorRefs: ChangeDetectorRef) { }
    public loadComponent  :boolean= false;
    public vendorname:string;
    public stateInputChange$: Subject<string>=new Subject<string>();
    public Opis :IVendorList[];
    public  displayVendorComponent :boolean=false
    public validation:boolean=false;
    public tableRow:ICleanedBankStatementcontents;
    public buttonDisabled:boolean=false;
    public res: ICleanedBankStatementcontents[];
    public vendorlist:boolean=true;
    public masterVendorlist:boolean=false;
    public newVendorlist:boolean=false;
  filteredOptions: Observable<IVendorList[]>;
  filteredoptions:any[];
  options: ICleanedBankStatementcontents[]=[]
  Options:IVendorList[];
  AccountNames:any;
   public filteredOpis$ :  Observable<IVendorList[]>;
public sortedArray:ICleanedBankStatementcontents[]=[];
  ngOnInit(): void
  {
    
    for (let i:number=0;i<this.pdfopencloseService.displayDataForBankStatement().length;i++)
    {
      this.sortedArray.push({
        date: this.pdfopencloseService.displayDataForBankStatement()[i].date,
        description:this.pdfopencloseService.displayDataForBankStatement()[i].description,
        amount:this.pdfopencloseService.displayDataForBankStatement()[i].amount,
        vendor:this.pdfopencloseService.displayDataForBankStatement()[i].vendor,
        account:this.pdfopencloseService.displayDataForBankStatement()[i].account,
        flag:this.pdfopencloseService.displayDataForBankStatement()[i].flag,
        newFlag: this.pdfopencloseService.displayDataForBankStatement()[i].flag,
        flagNumber: this.pdfopencloseService.displayDataForBankStatement()[i].flag==="V"? 4: this.pdfopencloseService.displayDataForBankStatement()[i].flag==="M"? 2 : this.pdfopencloseService.displayDataForBankStatement()[i].flag==="N"?3:this.pdfopencloseService.displayDataForBankStatement()[i].flag===""?1:5
       }
       )
    }
    this.dataSource.data=this.sortedArray.sort((a,b)=>(a.flagNumber-b.flagNumber))
    this.pdfopencloseService.senddataforDescription(this.dataSource.data)
    // this.dataSource.data=this.pdfopencloseService.displayDataForBankStatement().sort((a,b)=>(a.flag<b.flag?-1:1)); 
    this.dataSource.paginator = this.paginator;
    this.Opis=this.displayvendorlistService.getVendorList(); 
    

    this.filteredOpis$=this.stateInputChange$.pipe(
      rxjsOps.debounceTime(300),
      rxjsOps.map((s: string)=>{return this.Opis.filter(opi=>opi.name.toLowerCase().includes(s.toLowerCase()));}))
  } 
  radioChange($event: MatRadioChange) {
    debugger;
    if ($event.value==="1")
    {
this.vendorlist=true; debugger;
this.masterVendorlist=false;
this.newVendorlist=false;
    }
    if ($event.value==="2")
    {
this.masterVendorlist=true;
this.newVendorlist=false;
this.vendorlist=false;
    }
    if($event.value==="3")
    {
      this.masterVendorlist=false;
      this.vendorlist=false;
this.newVendorlist=true;
    }

    
}
  getRecord(row)
  {
    this.Options = [];
   // row.vendor="";
    this.Options= this.displayvendorlistService.getVendorList().map(a=>a.name)
 

  }
  onSelect(value,row:ICleanedBankStatementcontents) {
   row.vendor='';
   let el: HTMLElement = this.myDiv.nativeElement;
    el.click();
this.tableRow=row;
this.Options=[];
  }
  onSelect2(value,row:ICleanedBankStatementcontents) {
    // row.vendor='';
    let el: HTMLElement = this.myDiv.nativeElement;
     el.click();
 this.tableRow=row;
 this.Options=[];
   }
public valueMapper = (key) => {
this.tableRow.vendor=key
this.vendorname=this.tableRow.vendor
  this.tableRow.account=this.displayvendorlistService.getVendorList().filter(a=>a.name===key).map(x=>x.account).toString();
if(this.vendorlist)
{
  this.tableRow.account=this.displayvendorlistService.getVendorList().filter(a=>a.name===key).map(x=>x.account).toString();
  this.tableRow.flag='V';
  this.tableRow.flagNumber=4;
  this.tableRow.newFlag='Vendorlist'
}
if(this.masterVendorlist)
{
  
  this.tableRow.account=this.displayvendorlistService.readMasterVendor().filter(a=>a.name===key).map(x=>x.account).toString();
  this.tableRow.flag='M';
  this.tableRow.flagNumber=2
this.tableRow.newFlag='MasterVendorlist'
}
if(this.newVendorlist)
{
  this.tableRow.flag='N'
 this.tableRow.account=key
this.tableRow.flagNumber=3;
// this.tableRow.account=this.displayvendorlistService.getfullaccountlist().filter(option => option.toLowerCase().includes(this.searchkey)).toString()
}
this.dataSource.data=this.dataSource.data.sort((a,b)=>(a.flagNumber-b.flagNumber))
};

public valueAccountMapper = (key) => {
 
  if(this.newVendorlist)
  {
    debugger;
    this.tableRow.flag='N'
   this.tableRow.account=key
   this.tableRow.vendor=this.vendorname
this.tableRow.flagNumber=3
this.tableRow.newFlag='NewVendors'
this.dataSource.data=this.dataSource.data.sort((a,b)=>(a.flagNumber-b.flagNumber))
   // this.tableRow.account=this.displayvendorlistService.getfullaccountlist().filter(option => option.toLowerCase().includes(this.searchkey)).toString()
  }
  };
  onInputChanged(searchStr: string,row:ICleanedBankStatementcontents): void {
    this.Options = [];
   row.vendor="";
   this.vendorname=searchStr
   //this.Options= this.displayvendorlistService.getVendorList().map(a=>a.name)
   if(this.vendorlist)
   {
   this.Options=this.displayvendorlistService.getVendorList().filter(a=>a.name.toLowerCase().includes(searchStr))
   }
   if(this.masterVendorlist)
   {
     this.Options=this.displayvendorlistService.readMasterVendor().filter(a=>a.name.toLowerCase().includes(searchStr))
     
   }
   if(this.newVendorlist)
   {
     this.Options=[];
     this.AccountNames=this.displayvendorlistService.getfullaccountlist().filter(option => option.toLowerCase().includes(searchStr))
   //  row.vendor=searchStr;
   }
  }
  onInputChanged2(searchStr: string,row:ICleanedBankStatementcontents): void {
  
     if(this.newVendorlist)
   {
     debugger;
     this.Options=[];
     this.AccountNames=this.displayvendorlistService.getfullaccountlist().filter(option => option.toLowerCase().includes(searchStr))
      // row.vendor=searchStr;
   }
  }
displaymastervendor(res:IVendorList[])
{
this.displayvendorlistService.getMasterVendor(res)
}
displayerror(err:any)
{

}
  setFormData($event: MatAutocompleteSelectedEvent) {
    let physician = $event.option.value; 
  }
  private _filter(vendor: string): IVendorList[] {
    const filterValue = vendor.toLowerCase();
    return this.Opis.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  applyFilter(filterValue: string) {
   this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onChangePage(pageOfItems: Array<any>) {

    this.pageOfItems = pageOfItems;
}

startEdit(r){
console.log(r);
}
private onNamengModelDataChanged(newvalue:any, r: ICleanedBankStatementcontents){
   this.currentRow=r; 
   console.log(newvalue);
   if (typeof newvalue === "string") {
 this.currentRow.vendor=newvalue, 
 this.currentRow.account=''
  }
  else {
    if (r && newvalue) {
      this.currentRow.vendor=newvalue.name;
     this.currentRow.account=newvalue.account[0];
     this.currentRow.flag='V';
     this.currentRow.flag.fontcolor('blue');
     
    }

}
}

displayFn(vendor?: Ivendor): string | undefined {
  return vendor ? vendor.name: undefined;
}


deleteItem(row : ICleanedBankStatementcontents[])
{
  const dialogRef = this.dialog.open(AutocompletePopupComponent, {
    width: '700px',  
  });
  this.loadComponent = true;
  this.pdfopencloseService.sendDatatoDropdown(row);
this.loadComponent=false;
// this.dataSource.data=;
dialogRef.afterClosed().subscribe(()=>
{
this.dataSource.data=this.dataSource.data.sort((a,b)=>(a.flagNumber-b.flagNumber))
})

}


openDialog(row : ICleanedBankStatementcontents[])
{
  if(row['vendor']!='')
  {
  let newUpdatedRecord:ICleanedBankStatementcontents[]
 let oldAccountName:string;
  this.pdfopencloseService.sendDataForEditing(row);
  const dialogRef = this.dialog.open(EditComponentComponent, {
    width: '500px',  
  }).afterClosed().subscribe(updatedData=>{
    if(updatedData)
    newUpdatedRecord=updatedData.data,
    oldAccountName=updatedData.olderAccount;
    let oldAccountNameRecords:ICleanedBankStatementcontents[]=this.dataSource.data.filter(a=>a.account===oldAccountName ) ;
    let NewAccountNamesToBeUpdated:ICleanedBankStatementcontents[]=oldAccountNameRecords.filter(b=>b.vendor===newUpdatedRecord["vendor"]);
    for(let i:number=0;i<NewAccountNamesToBeUpdated.length;i++)
 {
  NewAccountNamesToBeUpdated[i]["account"]=updatedData.data["account"]
 }
  }
  );

}
else
{
  const dialogRef = this.dialog.open(FileUploadFailureComponent)
  let instance = dialogRef.componentInstance;
  instance.text ='User need to click on pop up button and enter the vendor list manually';

}
}

openDescriptionBox()
{
  const dialogRef = this.dialog.open(DescroptionDailogboxComponent, 
    { disableClose: true }
  )
  dialogRef.afterClosed().subscribe(data=>
{
  var unique = [...new Set(data.data.map(p => p.description))];   
  {
for (let j=0;j<this.dataSource.data.length;j++)
{  
  for (let k=0;k<unique.length;k++)
  {
    let testing:any=this.dataSource.data.filter(a=>a.description===unique[k])
    for (let z=0;z<testing.length;z++)
    {
    testing[z]["account"]=data.data.filter(a=>a.description===unique[k])[0].account;
    testing[z]["vendor"]=data.data.filter(a=>a.description===unique[k])[0].vendor;
    testing[z]["flag"]=data.data.filter(a=>a.description===unique[k])[0].flag;
    testing[z]["flagNumber"]=data.data.filter(a=>a.description===unique[k])[0].flagNumber
    }
  }
  }}
  this.dataSource.data=this.dataSource.data.sort((a,b)=>(a.flagNumber-b.flagNumber))
}
  
  )

}
enableEditMethod(e) {
 const diaologRef= this.dialog.open(EditComponentComponent)
  console.log( e);
}
submit()
{
let test: any[]=this.dataSource.data.filter(a=>a.vendor==="")
if (test.length>0)
{
  let blankVendorNumbers:number[]=[];
 let index:number;
 let tsting:string='';
  for (let i=0;i<this.dataSource.data.length;i++)
  {
if(this.dataSource.data[i]['vendor']==="")
{
     index =i+1;
     blankVendorNumbers.push(index);
     tsting=tsting+index +',';
  }
}
let test4:string=tsting.slice(0,-1);
let test5:string = test4.slice(0,36)+'<br>'+test4.slice(36)
  const dialogRef = this.dialog.open(ValidationCleanBankStatementComponent, { disableClose: true });
  let instance = dialogRef.componentInstance;
  instance.text =test5;

} 
else 
{
  this.validation=false;
this.pdfopencloseService.sendDataToSalesAndExpense(this.dataSource.data);
this.buttonDisabled=true;
}
}
test()
{
  
  const dialogRef = this.dialog.open(DisplayNewVendorsComponent,this.config);
  this.displayVendorComponent=true;
   this.res=this.dataSource.data.filter(a=>a.newFlag)

   this.pdfopencloseService.sendNewDataofVendors(this.res);
}
reset()
{ 
  this.validation=false;
}
downloaddataExcel()
{
  let dataToExport = this.dataSource.filteredData
  .map(x => ({
    Date: x.date,
    Description: x.description,
    Amount : x.amount,
    Vendor : x.vendor,
    Account : x.account,
    Flag: x.flag
  }));


const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(dataToExport);
const wb: XLSX.WorkBook = XLSX.utils.book_new();
var wscols = [
  { wch: 20 },
  { wch: 75 },
  { wch: 10 },
  { wch: 30 },
  { wch: 50 },
  {wch:10}
];
ws["!cols"] = wscols;

XLSX.utils.book_append_sheet(wb, ws, 'CleanBankStatement');

/* save to file */
XLSX.writeFile(wb, 'CleanBankStatement.xlsx');
}


}
