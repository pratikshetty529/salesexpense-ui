import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient,HttpEventType, HttpErrorResponse  } from '@angular/common/http';
import { of } from 'rxjs';  
import { catchError, map } from 'rxjs/operators';  
import { FileuploadserviceService } from  '../service/fileuploadservice.service';
import {Router} from '@angular/router';
import {IVendorList} from '../interface/IVendorList';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import  {DisplayvendorlistService} from '../service/displayvendorlist.service';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})

export class UploadFileComponent implements OnInit {
  SERVER_URL=" https://salesexpense.herokuapp.com/salesexpense/uploaddocuments"
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('tabs') tabs: MatTabGroup;
 AccountList: any=[];
 myFiles:string [] = [];
 pageOfItems: Array<any>;
 displayedColumns = [ 'name', 'account', 'count'];
 dataSource = new MatTableDataSource<IVendorList>();
 account: any[];
 selectedIndex:number=0;
  uploadForm: FormGroup;
  uploadForm2:FormGroup;
   formData = new FormData();
   frmData = new FormData();
  public front:boolean=false;
  public  validation:boolean=false;
  constructor(
    private formBuilder: FormBuilder,
     private httpClient: HttpClient,
     private uploadService: FileuploadserviceService,
     private router: Router,
     private displayVendorService : DisplayvendorlistService
     ) { }

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];  
  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }

  uploadFile(file) {  
    const formData = new FormData();  
    formData.append('file', file.data);  debugger;
    file.inProgress = true;  
    const target= event.target as HTMLInputElement;
    this.uploadService.upload(formData).pipe(  
      map(event => {  
        switch (event.type) {  
          case HttpEventType.UploadProgress:  
            file.progress = Math.round(event.loaded * 100 / event.total);  debugger;
            break;  
          case HttpEventType.Response:  
            return event;  
        }  
      }),  
      catchError((error: HttpErrorResponse) => {  
        file.inProgress = false;  
        return of(`${file.data.name} upload failed.`);  
      })).subscribe((event: any) => {  
        if (typeof (event) === 'object') {  
          console.log(event.body);  
        }  
      });  
  }
  reset(){
    
    this.validation=false;
  }
  isSelected(index: number) {
    if (this.selectedIndex == index) {
        return false; debugger;
    } else {
        return true;
    }
}
  
onFileSelect(event) {
  
    if (event.target.files.length > 0) {
  
      const filename = event.target.files[0].name; debugger
      
      if(filename && filename.includes('Balance Sheet'))
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
      if(filename && filename.includes('Account list') && this.myFiles && this.myFiles.length===0)
      {
        this.validation=true;
      } 
      if(filename && filename.includes('Account list') && this.myFiles && this.myFiles.length>0)
      {       
        const file = event.target.files[0]; debugger;
         this.uploadForm.get('profile').setValue(file);             
         this.formData.append('file', this.uploadForm.get('profile').value);
         this.myFiles.push(file)
         this.frmData.append("acccountList",this.myFiles[1]);
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
}
;  
this.selectedIndex=1;
 this.myFiles.splice(0,this.myFiles.length);
}
  private uploadFiles() {  
    this.fileUpload.nativeElement.value = '';  
    this.files.forEach(file => {  
      this.uploadFile(file);  
    });  
}

displayerror(err)
{
this.front=false;

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
{if(event.index===1)
{
  event.tab.enabled=true;
}
if (event.index===0)
{
  this.selectedIndex=0;
}
}
onChangePage(pageOfItems: Array<any>) {
  // update current page of items
  this.pageOfItems = pageOfItems;
}


}

