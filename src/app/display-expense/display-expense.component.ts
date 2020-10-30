import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Sales } from '../interface/IGeneratedBankStatement';
import {PdfopencloseService} from '../service/pdfopenclose.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-display-expense',
  templateUrl: './display-expense.component.html',
  styleUrls: ['./display-expense.component.css']
})
export class DisplayExpenseComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns = [ 'account', 'amount', 'bank','date','description','payee','reff','toBePrinted'];
  
  constructor(private pdfopenCloseService:PdfopencloseService) { }
  dataSource = new MatTableDataSource<Sales[]>();
  pageOfItems: Array<any>;
  selectedIndex:number=0;
  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.data= this.pdfopenCloseService.ReadDataToExpense();
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
  const workSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
    XLSX.writeFile(workBook, 'ExpenseDetails.xlsx');
}
onLinkClick(event)
{
  
  if(event.index===1)
{
  //event.tab.enabled=true;
}
if (event.index===0)
{
  
}
}
  }

