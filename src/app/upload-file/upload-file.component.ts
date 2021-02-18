import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import {IVendorList} from '../interface/IVendorList';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import  {DisplayvendorlistService} from '../service/displayvendorlist.service';
import { MatTabGroup } from '@angular/material/tabs';
import {MatStepper} from '@angular/material/stepper';
import {DropdowndialogService} from '../service/dropdowndialog.service'
import { MatDialog } from '@angular/material/dialog';
import { OpeningDropdownComponent } from '../opening-dropdown/opening-dropdown.component';
import { ErrorMEssageforAccountUploadComponent } from '../error-messagefor-account-upload/error-messagefor-account-upload.component';
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})

export class UploadFileComponent implements OnInit {
  SERVER_URL=" https://salesexpense.osc-fr1.scalingo.io/salesexpense/uploaddocuments";
  LOCAL_URL="http://localhost:3000/vendorList";
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('tabs') tabs: MatTabGroup;
  @ViewChild('fileInput') myInputVariable: ElementRef;
  @ViewChild('fileInput2') myInputVariable2: ElementRef;
  @ViewChild('stepper') stepper: MatStepper;
 AccountList: any=[];
 selectedFood2: string;
 myFiles:string [] = [];
 private buttonFlag:boolean;
 public  back:boolean=false;
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
  checked: boolean=false;
  frmData = new FormData();  
   public error:boolean=false;
  public front:boolean=false;
  public  validation:boolean=false;
  constructor(
     private formBuilder: FormBuilder,
     private httpClient: HttpClient,
     private displayVendorService : DisplayvendorlistService,
     private dailogboxdrop: DropdowndialogService,
     public dialog: MatDialog,
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
    const dialogRef = this.dialog.open(OpeningDropdownComponent, { disableClose: true }
      ).afterClosed().subscribe(data=>
        { 
         if (data)
         {
           this.buttonName=data.buttonname
           this.buttonFlag=true;
           this.show=true;
           this.display=false;
           this.selectedFood2=data.buttonname;
           if (data.buttonname==="Desktop")
           {
             this.checked=true;
           }
         }
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
   this.selectedIndex=0
  }
  isSelected(index: number) {
    if (this.selectedIndex == index) {
        return false; 
    } else {
        return true;
    }
}
  
changed(){
  if (this.checked)
  {
    
this.selectedFood2="Desktop"
this.buttonFlag=true;
  }
  else 
  {
    this.selectedFood2="Online"
    this.checked=true;
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
        //this.myFiles.splice(1,this.myFiles.length[1])
      } 
      if(filename && filename.includes('balance') && filename.includes('sheet') && this.selectedIndex==0 )
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
        this.myFiles.splice(0,this.myFiles.length[1])
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
        //  this.front=false; 
         this.httpClient.post<any>(this.SERVER_URL, this.frmData).subscribe(  
           (res) => this.displayVendorService.displayVendorList(res,true) === true ? this.displayvendor(res) : this.displayerror(false),
           (err) => this.displayerror(err)
         )

        
      }
    
    }
  }
displayvendor(res)
{
if(res.vendorList===null)
{
let ErrorMessageArray:string[]=[]
ErrorMessageArray=res.errorMessage;
const dialogRef = this.dialog.open(ErrorMEssageforAccountUploadComponent, 
  { disableClose: true ,
    data: ErrorMessageArray
  }
).afterClosed().subscribe(data=>
  { 
   if (data.back)
   {
     debugger;
    this.selectedIndex=0;
    this.frmData.delete(this.myFiles[0]);
    this.frmData.delete(this.myFiles[1]);
    this.myFiles.splice(0,this.myFiles.length)
    this.frmData = new FormData();
   }
  })
  if(this.back)
  {
    }
 
}
else
{
  let isCompleted :boolean = true;
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
//  this.stepper._steps.forEach(step => step.editable = false);
}
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
  this.dataSource.data = res;  
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

