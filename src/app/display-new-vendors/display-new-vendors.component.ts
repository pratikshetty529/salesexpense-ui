import { Component, OnInit,ViewChild } from '@angular/core';
import {PdfopencloseService} from '../service/pdfopenclose.service'
import {IDisplayVendorDropdown, ICleanedBankStatementcontents, IVendorList, Ivendor} from '../interface/IGeneratedBankStatement';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-display-new-vendors',
  templateUrl: './display-new-vendors.component.html',
  styleUrls: ['./display-new-vendors.component.css']
})
export class DisplayNewVendorsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource = new MatTableDataSource<ICleanedBankStatementcontents>();
  pageOfItems: Array<any>;
   test :any[];
   public vendorData:ICleanedBankStatementcontents[]
  displayedColumns = ['vendor','account','Flag'];
  constructor(private pdfopencloseservice: PdfopencloseService,
    private httpClient: HttpClient,) { }

  ngOnInit(): void {
    this.dataSource.data=this.pdfopencloseservice.readNewDataofVendors(); debugger;
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

