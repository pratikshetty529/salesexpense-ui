import { Component, OnInit,ViewChild } from '@angular/core';
import {PdfopencloseService} from '../service/pdfopenclose.service'
import {IDisplayVendorDropdown, ICleanedBankStatementcontents, IVendorList, Ivendor} from '../interface/IGeneratedBankStatement';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient} from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { RecordsUpdatedComponent } from '../records-updated/records-updated.component';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadFailureComponent } from '../file-upload-failure/file-upload-failure.component';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-display-new-vendors',
  templateUrl: './display-new-vendors.component.html',
  styleUrls: ['./display-new-vendors.component.css']
})
export class DisplayNewVendorsComponent  {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource = new MatTableDataSource<ICleanedBankStatementcontents>();
  websiteList: any = ['Vendor list obtained from master vendor', 'Manually entered vendor list']
  public  displaydata : boolean=false;
 public  displaysubmit : boolean=false
  form = new FormGroup({
    website: new FormControl('', Validators.required)
  });
  
  get f(){
    return this.form.controls;
  }
  
  submit2(){
  
    if (this.form.value.website==="Vendor list obtained from master vendor")
    {
      this.displaysubmit=true;
      this.displaydata=true;
      this.dataSource.data=this.pdfopencloseservice.readNewDataofVendors().filter(a=>a.flag==="M" );
      this.dataSource.paginator = this.paginator;
    }
    else if (this.form.value.website==="Manually entered vendor list")
    {
      this.displaysubmit=true;
      this.displaydata=true; 
      this.dataSource.data=this.pdfopencloseservice.readNewDataofVendors().filter(a=>a.flag==="N");
      this.dataSource.paginator = this.paginator;
    }
  }
  pageOfItems: Array<any>;
   test :any[];
   public vendorData:ICleanedBankStatementcontents[]
  displayedColumns = ['vendor','account','flag'];
  constructor(private pdfopencloseservice: PdfopencloseService,
    private httpClient: HttpClient,public dialog: MatDialog) { }

  ngOnInit(): void {

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
   }
   changeWebsite(e) {
    console.log(e.target.value);
  }
   submit()
   {
    let newArray:any[];
    var node_form_data;
     var node_form_data2;
     if (this.dataSource.data) 
     {
        newArray = this.dataSource.data.map(o =>{
         return{ name : o.vendor,account: o.account
         }
        })
   ;
    }
  
       node_form_data = ({
        'newVendorDetails': newArray
    });
   
    this.httpClient.post<any>('https://salesexpense.osc-fr1.scalingo.io/salesexpense/addnewvendordetails', node_form_data).subscribe(  
      (res) =>  this.displayvendor() ,
      (err) => this.displayerror(err)
    )
  }
   
  displayvendor()
  {
    const dialogRef = this.dialog.open(RecordsUpdatedComponent)
    let instance = dialogRef.componentInstance;
    instance.text ='Master Records Updated sucessfully';
      }
  
  displayerror(err:any[])
  {
    const dialogRef = this.dialog.open(FileUploadFailureComponent)
    let instance = dialogRef.componentInstance;
    instance.text ='Master Record Update failed';
      }
    
close()
{
  const dialogRef = this.dialog.open(RecordsUpdatedComponent)
dialogRef.close();
}    
downloaddataExcel()
{
  let dataToExport = this.dataSource.filteredData
  .map(x => ({
    Vendor: x.vendor,
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
XLSX.writeFile(wb, 'NewVendor.xlsx');
}
}

