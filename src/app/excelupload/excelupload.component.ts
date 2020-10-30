import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import * as XLSX from 'xlsx';
type AOA = any[][];
@Component({
  selector: 'app-excelupload',
  templateUrl: './excelupload.component.html',
  styleUrls: ['./excelupload.component.css']
})
export class ExceluploadComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  data: AOA = [];
  fileName: string = 'SheetJS.xlsx';
 // wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
 // fileName: string = 'SheetJS.xlsx';

 onFileChange(evt: any) {
   
   /* wire up file reader */
   const target: DataTransfer = <DataTransfer>(evt.target);
   if (target.files.length !== 1) throw new Error('Cannot use multiple files');
   const reader: FileReader = new FileReader();
   reader.onload = (e: any) => {
     /* read workbook */
     const bstr: string = e.target.result;
     XLSX
     const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

     /* grab first sheet */
     const wsname: string = wb.SheetNames[0];
     const ws: XLSX.WorkSheet = wb.Sheets[wsname];

     /* save data */
     this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
     console.log(this.data);
   };
   reader.readAsBinaryString(target.files[0]);
 }

 showstepper() {
  this.router.navigate(["stepper"]);
 }
 export(): void {
   /* generate worksheet */
   const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

   /* generate workbook and add the worksheet */
   const wb: XLSX.WorkBook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

   /* save to file */
   XLSX.writeFile(wb, this.fileName);
 }
}
