import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import {IVendorList} from '../interface/IVendorList';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {DisplayvendorlistService} from '../service/displayvendorlist.service';
@Component({
  selector: 'app-new-display-vendor-list',
  templateUrl: './new-display-vendor-list.component.html',
  styleUrls: ['./new-display-vendor-list.component.css']
})
export class NewDisplayVendorListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
 AccountList: any=[];
 pageOfItems: Array<any>;
 displayedColumns = [ 'name', 'account', 'count'];
 dataSource = new MatTableDataSource<IVendorList>();

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

}
