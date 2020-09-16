import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import {IVendorList} from '../interface/IVendorList';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import  {DisplayvendorlistService} from '../service/displayvendorlist.service';
import { MatTabGroup } from '@angular/material/tabs';
import {DropdowndialogService} from '../service/dropdowndialog.service'
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})

export class UploadFileComponent implements OnInit {
  SERVER_URL=" https://salesexpense.herokuapp.com/salesexpense/uploaddocuments";
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('tabs') tabs: MatTabGroup;
  @ViewChild('fileInput') myInputVariable: ElementRef;
  @ViewChild('fileInput2') myInputVariable2: ElementRef;
 AccountList: any=[];
 selectedFood2: string;
 myFiles:string [] = [];
 private buttonFlag:boolean;
 pageOfItems: Array<any>;
 displayedColumns = [ 'name', 'account', 'count'];
 dataSource = new MatTableDataSource<IVendorList>();
 account: any[];
 show:boolean=false;
display:boolean=true;
public buttonName:any;
 selectedIndex:number=0;
  uploadForm: FormGroup;
  uploadForm2:FormGroup;
  formData = new FormData();
  frmData = new FormData();  
   public error:boolean=false;
  public front:boolean=false;
  public  validation:boolean=false;
  constructor(
     private formBuilder: FormBuilder,
     private httpClient: HttpClient,
     private displayVendorService : DisplayvendorlistService,
     private dailogboxdrop: DropdowndialogService
     ) { }

     foods = [
      {value: 'Online', viewValue: 'Online'},
      {value: 'Desktop', viewValue: 'Desktop'},
    ];
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];  
  ngOnInit(): void {
    this.show=this.dailogboxdrop.readFlag();
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }

  onFoodSelection2() {
    this.buttonFlag=true;
    this.show=true;
    this.display=false;
    this.buttonName=this.selectedFood2;
  }
  reset(){ 
    this.validation=false;
    this.error=false;
  }
  isSelected(index: number) {
    if (this.selectedIndex == index) {
        return false; 
    } else {
        return true;
    }
}
  
toggle()
{
  if (this.selectedFood2==="Online" && this.show && !(this.buttonFlag))
  {
    this.selectedFood2="Desktop"
    this.buttonName=this.selectedFood2
    this.buttonFlag===true;
  }
  else if(this.selectedFood2==="Desktop" && this.buttonFlag)
  {
    this.selectedFood2="Online";
    this.buttonName=this.selectedFood2;    
  }
  else if (this.selectedFood2==="Desktop" && !(this.buttonFlag) )
  {
    this.selectedFood2="Online";
    this.buttonName=this.selectedFood2;
  }else  if (this.selectedFood2==="Online" && (this.buttonFlag))
  {
    this.selectedFood2="Desktop"
    this.buttonName=this.selectedFood2
    this.buttonFlag===true;
  }
}
onFileSelect(event) {
    if (event.target.files.length > 0) {
  
      let filename = (event.target.files[0].name).toLowerCase(); 
      if(filename && filename.includes('balance') && filename.includes('sheet') && this.myFiles && this.myFiles.length>0 && this.selectedIndex===1)
      {
        this.validation=true;
        this.myFiles.splice(1,this.myFiles.length)
      } 
      if(filename && filename.includes('balance') && filename.includes('sheet') && this.myFiles.length===0)
      {     
        this.selectedIndex=0  
        const file = event.target.files[0];
         this.uploadForm.get('profile').setValue(file);     
         this.formData.append('file', this.uploadForm.get('profile').value);
         
         if (this.myFiles && this.myFiles.length>0)
         {
          this.myFiles.splice(0,this.myFiles.length);
         }
         this.myFiles.push(file);
         this.frmData.append("balanceSheetDetails",this.myFiles[0])
         this.selectedIndex=1
      }
      if(filename && filename.includes('account') && filename.includes('list')&& this.myFiles && this.myFiles.length===0 && this.selectedIndex===0)
      {
        this.validation=true;
        this.myFiles.splice(0,this.myFiles.length)
      } 
      
      if(filename && filename.includes('account') && filename.includes('list') && this.myFiles && this.myFiles.length>0)
      {       
        const file = event.target.files[0];
         this.uploadForm.get('profile').setValue(file);             
         this.formData.append('file', this.uploadForm.get('profile').value);
         this.myFiles.push(file)
         this.frmData.append("acccountList",this.myFiles[1]);
 if (this.selectedFood2)
      {
        var node_form_data = JSON.stringify({
          'documentType': this.selectedFood2
      });
    }
         
         this.frmData.append("documentType",node_form_data)
         this.front=false; 
         this.httpClient.post<any>(this.SERVER_URL, this.frmData).subscribe(  
           (res) => this.displayVendorService.displayVendorList(res,true) === true ? this.displayvendor() : this.displayerror(false),
           (err) => this.displayerror(err)
         )
        
      }
    
    }
  }
displayvendor()
{
this.front=true; 
for (let i=0; i< this.myFiles.length;i++)
{
this.formData.delete(this.myFiles[i]);
this.frmData.delete(this.myFiles[i]);
this.frmData.delete(this.selectedFood2);
this.frmData = new FormData();
}
this.selectedIndex=0;
 this.myFiles.splice(0,this.myFiles.length);
}

displayerror(err)
{
this.front=false;
this.frmData = new FormData();
this.error=true;
}
displayvendorlist(res)
{
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
  this.dataSource.data = res.vendorList;  
}
applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
onLinkClick(event)
{
  
  if(event.index===1)
{
  event.tab.enabled=true;
}
if (event.index===0)
{
  this.selectedIndex=0;
  this.myInputVariable.nativeElement.value = "";
  this.myInputVariable2.nativeElement.value="";

}
}
onChangePage(pageOfItems: Array<any>) {
  // update current page of items
  this.pageOfItems = pageOfItems;
}


}

