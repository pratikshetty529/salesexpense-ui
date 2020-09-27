import { Component, OnInit, ViewChild,ElementRef,HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {DisplayvendorlistService} from '../service/displayvendorlist.service';
import {PdfopencloseService} from '../service/pdfopenclose.service';
import {OpeningClosingValidationComponent} from '../opening-closing-validation/opening-closing-validation.component'
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
  public error:boolean=false;
  formData = new FormData();
  tes2 =new FormData();
  public filenamePDf:string="";
  public  validation:boolean=false;
  
  LOCAL_URL="http://localhost:3000/cleanedBankStatement";
  SERVER_URL="https://salesexpense.herokuapp.com/salesexpense/processbankstatement"
  constructor( private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private displayVendorService : DisplayvendorlistService,
    private pdfOpencloseService : PdfopencloseService,
    private elementRef: ElementRef
    ) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    })
    
  if(this.filenamePDf.includes('Bank'))
  {
   this.ngOndestroy(); debugger;
  }
  }

  test()
  {
    location.reload();
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
this.error=false;
  }
onFileSelect(event) {
  
  if (event.target.files.length > 0) {

    const filename = event.target.files[0].name; 
    this.filenamePDf=filename;
    debugger;
    if(filename && filename.includes('Bank Sheet'))
    {     
      
      const file = event.target.files[0];
       this.uploadForm.get('profile').setValue(file);     
       this.formData.append('file', this.uploadForm.get('profile').value);
       

      let vendorList= JSON.stringify(this.displayVendorService.displaybank());
      this.formData.append('vendorlistdata',vendorList)


       this.httpClient.post<any>(this.SERVER_URL,this.formData).subscribe(  
          (res) => this.pdfOpencloseService.sendDataForValidation(res) === true ? this.displayValidationPopup(res,vendorList) : this.displayerror(false),   
        (err) => this.displayerror(err)
       ) 
    }
    else if(filename && !filename.includes('Bank Sheet'))
{
  this.error=true;
  
}
    
  
  }
}

displayValidationPopup(res,vendorList)
{
  this.front=true;

}
displayvendor(res)
    {
    
    }

    displayerror(err)
    {

    }

    ngOndestroy() {
      this.elementRef.nativeElement.remove();
    }
    
}
