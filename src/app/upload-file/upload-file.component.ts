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
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})

export class UploadFileComponent implements OnInit {
 SERVER_URL=" https://salesexpense.herokuapp.com/salesexpense/uploaddocuments"
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
 AccountList: any=[];
 pageOfItems: Array<any>;
 displayedColumns = [ 'name', 'account', 'count'];
 dataSource = new MatTableDataSource<IVendorList>();
 account: any[];
  uploadForm: FormGroup;
  public front:boolean=false;
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

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
      this.front=false;
    
    }
  }

  onSubmit() {
   this.front=true;
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);

    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
     (res) =>this.displayvendorlist(res), 
 //   (res)=> this.displayVendorService.displayVendorList(res),
      (err) => this.displayerror(err)

    )


    }

  
  handleError(error) {
    console.log('test'); 
    // do something with the exception
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
  this.dataSource.data = res;  
}
applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
onChangePage(pageOfItems: Array<any>) {
  // update current page of items
  this.pageOfItems = pageOfItems;
}

onClick() {  
  const fileUpload = this.fileUpload.nativeElement;fileUpload.onchange = () => {  
  for (let index = 0; index < fileUpload.files.length; index++)  
  {  
   const file = fileUpload.files[index];  
   this.files.push({ data: file, inProgress: false, progress: 0});  
  }  
    this.uploadFiles();  debugger;
  };  
  
  fileUpload.click();  
}
}

