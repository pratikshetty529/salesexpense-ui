import { Component, OnInit,ViewChild } from '@angular/core';
import {PdfopencloseService} from '../service/pdfopenclose.service'
import {IDisplayVendorDropdown, ICleanedBankStatementcontents, IVendorList, Ivendor} from '../interface/IGeneratedBankStatement';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient} from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';

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
  form = new FormGroup({
    website: new FormControl('', Validators.required)
  });
  
  get f(){
    return this.form.controls;
  }
  
  submit2(){
    console.log(this.form.value);
    if (this.form.value.website==="Vendor list obtained from master vendor")
    {
      this.displaydata=true;
      this.dataSource.data=this.pdfopencloseservice.readNewDataofVendors().filter(a=>a.flag==="M" || a.flag==="N"); debugger;
      this.dataSource.paginator = this.paginator;
    }
    else if (this.form.value.website==="Manually entered vendor list")
    {
      this.displaydata=true;
      this.dataSource.data=this.pdfopencloseservice.readNewDataofVendors().filter(a=>a.flag==="N"); debugger;
      this.dataSource.paginator = this.paginator;
    }
  }
  pageOfItems: Array<any>;
   test :any[];
   public vendorData:ICleanedBankStatementcontents[]
  displayedColumns = ['vendor','account','flag'];
  constructor(private pdfopencloseservice: PdfopencloseService,
    private httpClient: HttpClient,) { }

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
    console.log(node_form_data);debugger;
    this.httpClient.post<any>('https://salesexpense.herokuapp.com/salesexpense/addnewvendordetails', node_form_data).subscribe(  
      (res) =>  this.displayvendor() ,
      (err) => this.displayerror(err)
    )
  }
   
  displayvendor()
  {

  }  
  displayerror(err:any[])
  {

  }     
    
}

