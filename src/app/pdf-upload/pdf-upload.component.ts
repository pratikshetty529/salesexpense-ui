import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {DisplayvendorlistService} from '../service/displayvendorlist.service';
import {PdfopencloseService} from '../service/pdfopenclose.service';
import {OpeningClosingValidationComponent} from '../opening-closing-validation/opening-closing-validation.component'
import { IVendorList} from '../interface/IGeneratedBankStatement';
import {ErrorhandlerComponent} from '../errorhandler/errorhandler.component';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadFailureComponent } from '../file-upload-failure/file-upload-failure.component';
@Component({
  selector: 'app-pdf-upload',
  templateUrl: './pdf-upload.component.html',
  styleUrls: ['./pdf-upload.component.css']
})
export class PdfUploadComponent implements OnInit {
  @ViewChild(OpeningClosingValidationComponent) otherCompt: OpeningClosingValidationComponent
  uploadForm: FormGroup;
  public  openingBalance:  string  =  "";
  public  closingBalance:  string  =  "";
  public front :boolean=false;
  public  back:boolean=false;
  formData = new FormData();
  tes2 =new FormData();
  public  validation:boolean=false;
  LOCAL_URL="http://localhost:3000/cleanedBankStatement";
  SERVER_URL="https://salesexpense.herokuapp.com/salesexpense/processbankstatement"
  constructor( private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private displayVendorService : DisplayvendorlistService,
    private pdfOpencloseService : PdfopencloseService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    })
  }

  
  submit()
  {
     let test:any =this.pdfOpencloseService.readDataFromBankStatement()
     if (test.openingBalance===this.openingBalance && test.closingBalance===this.closingBalance)
     {
       this.validation=false;
         this.back=true;
         this.front=false;
         this.pdfOpencloseService.masterVendorListStatus(this.back,this.front)
      }
       else 
      {
        this.validation=true;
       this.back=false;
      }
  }
  reset()
  {
this.validation=false
  }
  test6()
  {
    this.validation=false;
    this.back=true;
    this.front=false;
  }
onFileSelect(event) {
  
  if (event.target.files.length > 0) {

    const filename = event.target.files[0].name; 
    
    if(filename && filename.includes('Bank Sheet'))
    {     
      
      const file = event.target.files[0];
       this.uploadForm.get('profile').setValue(file);     
       this.formData.append('file', this.uploadForm.get('profile').value);
       

      let vendorList= JSON.stringify(this.displayVendorService.displaybank());
      this.formData.append('vendorlistdata',vendorList)

  // )
       this.httpClient.post<any>(this.SERVER_URL,this.formData).subscribe(  
          (res) => this.pdfOpencloseService.sendDataForValidation(res) === true ? this.displayValidationPopup(res,vendorList) : this.displayerror(false),
      
        (err) => this.displayerror(err)
       )  
    }
    else 
    {
  const dialogRef = this.dialog.open(FileUploadFailureComponent)
  let instance = dialogRef.componentInstance;
  instance.text ='Please upload Bank Sheet only';
    }

    
  
  }
}

displayValidationPopup(res,vendorList)
{
  this.fetchCleanedBankStatement()
  this.front=true;
  const dialogRef = this.dialog.open(OpeningClosingValidationComponent, { disableClose: true }
  ).afterClosed().subscribe(data=>
    { 
     if (data.back)
     {
       this.back=true;
     }
    });

  //OpeningClosingValidationComponent
}

fetchCleanedBankStatement()
{
    this.httpClient.get<any>('https://salesexpense.herokuapp.com/salesexpense/getmastervendorlist').subscribe(  
    (res) => this.displaymastervendor(res) ,
    (err) => this.displayerror(err)
  )
}
displaymastervendor(res:IVendorList[])
{

this.displayVendorService.getMasterVendor(res)
}
displayvendor(res)
    {
      console.log(res)
    }

    displayerror(err)
    {
      const dialogRef = this.dialog.open(ErrorhandlerComponent, {
        width: '400px', 
        height: '200px'
      });
    }
}
