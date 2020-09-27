import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {PdfopencloseService} from '../service/pdfopenclose.service';
import { IVendorList, Ivendor, ICleanedBankStatementcontents} from '../interface/IGeneratedBankStatement';
import { DisplayvendorlistService } from '../service/displayvendorlist.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import * as rxjsOps from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient} from '@angular/common/http';
import {DialogboxComponentComponent} from '../dialogbox-component/dialogbox-component.component'
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-autocomplete-popup',
  templateUrl: './autocomplete-popup.component.html',
  styleUrls: ['./autocomplete-popup.component.css']
})
export class AutocompletePopupComponent implements OnInit {
  dataSource = new MatTableDataSource<Ivendor[]>();
  
  constructor(private pdfOpenCloseService:PdfopencloseService,
    private displayvendorlistService: DisplayvendorlistService,
    private httpClient: HttpClient,
    private elementRef: ElementRef,
    private dialogRef: MatDialogRef<DialogboxComponentComponent >
    ) { }
    loadComponent:boolean;
    displayVendorComponent: boolean=false;
public buttonName :string;
 displayVendor :IVendorList[];
public stateInputChange$: Subject<string>=new Subject<string>();
public Opis :IVendorList[];
masterVendor:boolean=false;
SERVER_URL: "http://localhost:3000/masterVendorList";
name:string[]
account:string[]
displaydropdown :any=[];
public  vendor:  string  =  "";
public accounts:String="";
displayedColumns = [ 'name', 'account'];
public filteredOpis$ :  Observable<IVendorList[]>;
myControl = new FormControl();
vendorFlag:string;
MasterVendorFlag:string;
vendorlist:boolean=false;
Mastervendor:boolean=false;
dataObtained:string;


ngOnInit(): void {
this.buttonName='Vendor List';
this.vendorFlag='vendorFlag'
this.Opis=this.displayvendorlistService.getVendorList(); 
 this.filteredOpis$=this.myControl.valueChanges.
 pipe(startWith(''),
map(value => this._filter(value)))
this.dataObtained='Vendorlist';

}

  displayFn(vendor?: Ivendor): string | undefined {
    return vendor ? vendor.name: undefined;
  }
  
  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
  this.displaydropdown.push(event.option.value);
  this.dataSource=this.displaydropdown;

  }
  private _filter(value: string): IVendorList[] {
    if(value) {
      value=value.toLowerCase();
      const filteredSet = this.Opis.filter(option => option.name.toLowerCase().includes(value));
      return filteredSet;
    }
    else {
      return []
    }
  
  }

  submit()
  {
    let tets :ICleanedBankStatementcontents[] = this.pdfOpenCloseService.readDataFromDropdown()
    if (this.dataObtained==='MasterVendorlist')
    {
    tets['flag']='M';
    }
    else if(this.dataObtained==='Vendorlist')
    {
    tets['flag']='V'
    }
    if(this.displaydropdown && this.displaydropdown.length>0)
    {
    let test: string=String(this.displaydropdown.map(a=>a.name));
    let test2 :string=String(this.displaydropdown.map(a=>a.account));
   
    tets['vendor']=String(test); 
    tets['account']=String(test2);
    this.loadComponent=false;
   }
  else 
  {
    
    tets['vendor']=String(this.vendor);
   if (this.accounts==="" && this.vendor!=="")
   { 
    tets['account']='Uncatergorized Response'
   }
   else if(this.accounts!==null)
   {
   tets['account']=this.accounts
   }
    tets['flag']='N';
    this.loadComponent=false;
    this.vendor='';
    this.accounts='';
   
  }
  this.dialogRef.close();
}
close()
{
  this.dialogRef.close();
}
toggle()
{
  if (this.buttonName==="Vendor List" && this.Mastervendor===false)
  {
  this.buttonName="Master Vendor List";debugger
  this.fetchCleanedBankStatement();
  this.Mastervendor=true;
  this.dataObtained='MasterVendorlist'
  
  }
  else if (this.buttonName==="Master Vendor List" && this.Mastervendor===true)
  {
   this.buttonName='Vendor List' 
   this.displayvendorList();
   this.Mastervendor=false;
   this.dataObtained='Vendorlist'
  }
}

fetchCleanedBankStatement()
{
    this.httpClient.get<any>('https://salesexpense.herokuapp.com/salesexpense/getmastervendorlist').subscribe(  
    (res) => this.displaymastervendor(res) ,
    (err) => this.displayerror(err)
  )
}

displayvendorList()
{
  this.Opis=this.displayvendorlistService.getVendorList(); 
  this.filteredOpis$=this.myControl.valueChanges.
  pipe(startWith(''),
  map(value => this._filter(value)))
}

displaymastervendor(res :IVendorList[])
{
  this.MasterVendorFlag='MasterVendorFlag'
  this.Opis=null;
  this.Opis=res.filter(a=>a.name); 
  this.filteredOpis$=null;
  this.masterVendor=true
  this.filteredOpis$=this.myControl.valueChanges.
  pipe(startWith(''),
  map(value => this._filter(value)));
}

displayerror(err :any)
{

}
test()
{
this.displayVendorComponent=true;
}

ngOndestroy() {
  this.elementRef.nativeElement.remove();
}
}
