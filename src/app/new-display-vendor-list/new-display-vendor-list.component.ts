import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import {IVendorList,IExcelVendorList} from '../interface/IVendorList';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {DisplayvendorlistService} from '../service/displayvendorlist.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-new-display-vendor-list',
  templateUrl: './new-display-vendor-list.component.html',
  styleUrls: ['./new-display-vendor-list.component.css']
})
export class NewDisplayVendorListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('TABLE') table: ElementRef;
  @ViewChild('table') table2:ElementRef;
 AccountList: any=[];
 pageOfItems: Array<any>;
 displayedColumns = [ 'name', 'account', 'count'];
 dataSource = new MatTableDataSource<IVendorList>();
 exportToExcelFileName: string='';
  constructor(private httpClient: HttpClient,
    private displayVendorListService : DisplayvendorlistService) { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.data= this.displayVendorListService.getVendorList();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}
downloaddataExcel()
{
  debugger;
let k:number=0;
let testing2=[];
  let testing={} as IExcelVendorList;
  for (let i: number=0;i<this.dataSource.data.length;i++)
  {
    testing2.push(
      {
          vendor :this.dataSource.data[i].name,
          account: this.dataSource.data[i].account[0],
          count: this.dataSource.data[i].count[0]
      }
    )
    if (this.dataSource.data[i].account.length>1)
    {
     for (let j=1;j<this.dataSource.data[i].account.length;j++)
    {
    testing2.push(
      {
        vendor: "",
        account:this.dataSource.data[i].account[j],
        count:this.dataSource.data[i].count[j]
      }
    )
    }} }
    const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(testing2);
const wb: XLSX.WorkBook = XLSX.utils.book_new();
var wscols = [
  { wch: 50 },
  { wch: 50 },
  { wch: 30 }
];
ws["!cols"] = wscols;

XLSX.utils.book_append_sheet(wb, ws, 'VendorList');

/* save to file */
XLSX.writeFile(wb, 'VendorList.xlsx');

}
}

