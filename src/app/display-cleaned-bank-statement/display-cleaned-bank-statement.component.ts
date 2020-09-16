import { Component, OnInit, ViewChild } from '@angular/core';
import {IGeneratedBankStatement} from '../interface/GeneratedBankStatement'
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {PdfopencloseService} from '../service/pdfopenclose.service';
import {DisplayvendorlistService} from '../service/displayvendorlist.service';
import { Observable, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import {IDisplayVendorDropdown, ICleanedBankStatementcontents, IVendorList, Ivendor} from '../interface/IGeneratedBankStatement';
import { startWith, map } from 'rxjs/operators';
import * as rxjsOps from 'rxjs/operators';

import {cObject,ObjectEditStatus} from '../cTableDataSource';
@Component({
  selector: 'app-display-cleaned-bank-statement',
  templateUrl: './display-cleaned-bank-statement.component.html',
  styleUrls: ['./display-cleaned-bank-statement.component.css']
})
export class DisplayCleanedBankStatementComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('table') table: MatTable<cObject>;
 
  dataSource = new MatTableDataSource<ICleanedBankStatementcontents>();
  pageOfItems: Array<any>;
  myControl = new FormControl();
  public currentRow:ICleanedBankStatementcontents;
  displayedColumns = [ 'date', 'description', 'amount', 'vendor','account','flag'];
  constructor(private pdfopencloseService: PdfopencloseService,
    private displayvendorlistService: DisplayvendorlistService) { }

    public stateInputChange$: Subject<string>=new Subject<string>();
    public Opis :IVendorList[];

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
  ngAfterViewInit(){
  //   this.Opis=this.displayvendorlistService.getVendorList(); 
  //   this.filteredOpis$=this.stateInputChange$.pipe(
  //     rxjsOps.debounceTime(10),
  // rxjsOps.map((s: string)=>{return this.Opis.filter(opi=>opi.name.toLowerCase().includes(s.toLowerCase()));}))
}
  
  private _filter(vendor: string): IVendorList[] {
    const filterValue = vendor.toLowerCase();
    return this.Opis.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  applyFilter(filterValue: string) {
   this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}
itemClassOnChange(val) {

} 


private onNamengModelDataChanged(newvalue:any, r: ICleanedBankStatementcontents){
   this.currentRow=r; debugger;
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

}
