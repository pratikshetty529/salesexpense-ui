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
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-autocomplete-popup',
  templateUrl: './autocomplete-popup.component.html',
  styleUrls: ['./autocomplete-popup.component.css']
})
export class AutocompletePopupComponent  {
  dataSource = new MatTableDataSource<Ivendor[]>();
  formGroup: FormGroup;
  isChecked = true;
  constructor(private pdfOpenCloseService:PdfopencloseService,
    private displayvendorlistService: DisplayvendorlistService,
    private httpClient: HttpClient,
    private elementRef: ElementRef,
    private dialogRef: MatDialogRef<DialogboxComponentComponent >,
    formBuilder: FormBuilder
    ) {     this.formGroup = formBuilder.group({
      vendorList2: false });}
    loadComponent:boolean;
    displayVendorComponent: boolean=false;
public buttonName :string;
 displayVendor :IVendorList[];
public stateInputChange$: Subject<string>=new Subject<string>();
public Opis :IVendorList[];
masterVendor:boolean=false;
SERVER_URL: "http://localhost:3000/masterVendorList";
name:string[]
account:string[];
public vendorList2 :string;
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
dataObtained:string=null;
checked:false;
checked2:false;
activatemanualentry:boolean=false;
deactivatemanualentry:boolean=true;
ngOnInit(): void {
this.buttonName='Vendor List';
this.vendorFlag='vendorFlag'
this.Opis=this.displayvendorlistService.getVendorList(); 
 this.filteredOpis$=this.myControl.valueChanges.
 pipe(startWith(''),
map(value => this._filter(value)))
//this.dataObtained='Vendorlist';

}
onFormSubmit(formValue: any) {
  alert(JSON.stringify(this.formGroup.value, null, 2));
}
  displayFn(vendor?: Ivendor): string | undefined {
    return vendor ? vendor.name: undefined;
  }
  changed(){
    if (this.checked)
    {
      this.fetchCleanedBankStatement();
  this.Mastervendor=true;
  this.dataObtained='MasterVendorlist'
  
    }
    else {
      this.displayvendorList();
      this.Mastervendor=false;
      this.dataObtained='Vendorlist'
    }
  }
  changed2()
  {
    if (this.checked2){
this.activatemanualentry=true;
this.deactivatemanualentry=false}
else 
{
  this.activatemanualentry=false;
  this.deactivatemanualentry=true;
}
  }
   onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    if (this.dataObtained===null)
    {
      this.dataObtained='Vendorlist'
  this.displaydropdown.push(event.option.value);
  this.dataSource=this.displaydropdown;
    }
    else if (this.dataObtained!==null)
    {
      this.displaydropdown.splice(0)
      this.displaydropdown.push(event.option.value);
      this.dataSource= new MatTableDataSource(this.displaydropdown);
     
    }
  }
  onClick()
  {
    
  }
  private _filter(value: string): IVendorList[] {
    if(value) {
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
    if (this.dataObtained==='MasterVendorlist' && this.displaydropdown && this.displaydropdown.length>0)
    {
  tets['newFlag']='MasterVendorlist'
  tets['flag']='M';
    }
    else if(this.dataObtained==='Vendorlist' && this.displaydropdown && this.displaydropdown.length>0)
    {
  tets['newFlag']='Vendorlist'
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
    tets['vendor']=this.vendor; debugger;
   if (this.accounts==="" && this.vendor!=="")
   { 
    tets['account']='Uncatergorized Response';
    tets['flag']='N';
    tets['newFlag']='NewVendors'
   }
   else if(this.accounts!==null && this.vendor!="" && this.accounts!=="")
   {
   tets['account']=this.accounts;
   tets['flag']='N';
   tets['newFlag']='NewVendors'
   }
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
    this.MasterVendorFlag='MasterVendorFlag'
    this.Opis=null;
    this.Opis=this.displayvendorlistService.readMasterVendor().filter(a=>a.name); 
    this.filteredOpis$=null;
    this.masterVendor=true
    this.filteredOpis$=this.myControl.valueChanges.
    pipe(startWith(''),
    map(value => this._filter(value)));
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
