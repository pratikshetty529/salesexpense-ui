 import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {IGeneratedBankStatement} from '../interface/GeneratedBankStatement'
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {PdfopencloseService} from '../service/pdfopenclose.service';
import {DisplayvendorlistService} from '../service/displayvendorlist.service';
import { Observable, Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {IDisplayVendorDropdown, ICleanedBankStatementcontents, IVendorList, Ivendor} from '../interface/IGeneratedBankStatement';
import { startWith, map } from 'rxjs/operators';
import * as rxjsOps from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {cObject,ObjectEditStatus} from '../cTableDataSource';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AutocompletePopupComponent } from '../autocomplete-popup/autocomplete-popup.component';
import * as XLSX from 'xlsx';
import { HttpClient} from '@angular/common/http';
import {ValidationCleanBankStatementComponent} from '../validation-clean-bank-statement/validation-clean-bank-statement.component'
import { EditComponentComponent } from '../edit-component/edit-component.component';
import { DisplayNewVendorsComponent } from '../display-new-vendors/display-new-vendors.component';
import { FileUploadFailureComponent } from '../file-upload-failure/file-upload-failure.component';
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
  patientCartegory : FormGroup;
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
  displayedColumns = [ 'date', 'description', 'amount', 'vendor','account','displaypopup','Flag'];
  constructor(private pdfopencloseService: PdfopencloseService,
    private displayvendorlistService: DisplayvendorlistService,
    private fb:FormBuilder,
    public dialog: MatDialog,  private httpClient: HttpClient,) { }
    public loadComponent  :boolean= false;
    public stateInputChange$: Subject<string>=new Subject<string>();
    public Opis :IVendorList[];
    public  displayVendorComponent :boolean=false
    public validation:boolean=false;
    public buttonDisabled:boolean=false;
    public res: ICleanedBankStatementcontents[];
  filteredOptions: Observable<IVendorList[]>;
  filteredoptions:any[];
  options: ICleanedBankStatementcontents[]=[]
   public filteredOpis$ :  Observable<IVendorList[]>;

  ngOnInit(): void
  {
    this.dataSource.data=this.pdfopencloseService.displayDataForBankStatement(); 
    this.dataSource.paginator = this.paginator;
    this.Opis=this.displayvendorlistService.getVendorList(); 
    this.filteredOpis$=this.stateInputChange$.pipe(
      rxjsOps.debounceTime(300),
      rxjsOps.map((s: string)=>{return this.Opis.filter(opi=>opi.name.toLowerCase().includes(s.toLowerCase()));}))
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
  ngAfterViewInit(){
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
itemClassOnChange(val) {

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
    width: '500px',  
  });
  this.loadComponent = true;
  this.pdfopencloseService.sendDatatoDropdown(row);
this.loadComponent=false;
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
this.buttonDisabled=true;
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
