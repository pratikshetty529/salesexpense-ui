import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogboxComponentComponent } from '../dialogbox-component/dialogbox-component.component';
import { ICleanedBankStatementcontents } from '../interface/IGeneratedBankStatement';
import { DisplayvendorlistService } from '../service/displayvendorlist.service';
import { PdfopencloseService } from '../service/pdfopenclose.service';
import { UpdationdescriptionComponent } from '../updationdescription/updationdescription.component';

@Component({
  selector: 'app-descroption-dailogbox',
  templateUrl: './descroption-dailogbox.component.html',
  styleUrls: ['./descroption-dailogbox.component.css']
})
export class  DescroptionDailogboxComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('table') table:ElementRef ;
  dataSource = new MatTableDataSource<ICleanedBankStatementcontents>();
public  vendor: string="";
public Flag:string="";
public description:string="";
public accountnames:string="";
public accountlistnames:string[];
public displayTable: boolean=false;
public Records:number;

public UpdatedRecord:number=0;
public newFilter:ICleanedBankStatementcontents[]=[];
public existingCleanBankStatementRecord:any[];
public test:any[]=[];
displayedColumns = [ 'date', 'description', 'amount', 'account','vendor'];
  constructor(private displayvendorlistservice:DisplayvendorlistService,
    private pdfopencloseService: PdfopencloseService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<DialogboxComponentComponent >
    ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;

    this.accountlistnames=this.displayvendorlistservice.getfullaccountlist();
    if (this.accountlistnames[0]==="Select Uncategorized Expenses")
    {
      this.accountlistnames.slice(1);
    }
    //this.existingCleanBankStatementRecord=this.pdfopencloseService.displayDataForBankStatement().filter(a=>a.vendor==="");
    this.existingCleanBankStatementRecord=this.pdfopencloseService.readdataforDescription().filter(a=>a.vendor==="");
    
  }
   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
}
onKey(value) { 
  this.accountlistnames = this.search(value);
  }
  search(value: string) { 
    let filter = value.toLowerCase();
    return this.displayvendorlistservice.getfullaccountlist().filter(option => option.toLowerCase().startsWith(filter));
  }
  changedescription()
  {
    if (this.vendor!=" ")
    
    this.description=this.vendor;
    this.displayTable=true;
    this.dataSource.data=this.existingCleanBankStatementRecord.filter(a=>a.description.toLowerCase().includes(this.description.toLowerCase()))
    this.dataSource.paginator = this.paginator;
    if(this.description!=" ")
    this.Records=this.dataSource.data.length
  }
  searchonDescription()
  {
    this.displayTable=true;
this.dataSource.data=this.existingCleanBankStatementRecord.filter(a=>a.description.toLowerCase().includes(this.description.toLowerCase()))
this.dataSource.paginator = this.paginator;
if(this.description!=" ")
this.Records=this.dataSource.data.length
  }
  updatedescription()
  {
    this.displayTable=true;
this.dataSource.data=this.existingCleanBankStatementRecord.filter(a=>a.description.toLowerCase().includes(this.description.toLowerCase()))
this.dataSource.paginator = this.paginator;
this.Records=this.dataSource.data.length

  }
  cancelonDescription()
  {
    var unique = [...new Set(this.newFilter.map(p => p.description))];
    {
        for (let j=0;j<this.pdfopencloseService.displayDataForBankStatement().length;j++)
        {  
          for (let k=0;k<unique.length;k++)
          {
            let testing:any=this.pdfopencloseService.displayDataForBankStatement().filter(a=>a.description===unique[k])
            for (let z=0;z<testing.length;z++)
            {
            testing[z]["account"]='';
            testing[z]["vendor"]='';
            testing[z]["flag"]='';
            testing[z]["flagNumber"]=3;
            }
          }
  }
}
this.UpdatedRecord=this.UpdatedRecord-unique.length;   
this.accountnames='';
this.description='';
this.vendor='';

  }
  applyDescription()
  {
    this.Flag='N';
    for (let i=0;i<this.dataSource.data.length;i++)
    {
      
      this.newFilter.push({
       date: this.dataSource.data[i].date,
       description: this.dataSource.data[i].description,
       amount:this.dataSource.data[i].amount,
       vendor:this.vendor,
       account:this.accountnames,
       flag:this.Flag,
       newFlag: this.Flag,
       flagNumber:3
      }
      )
      var unique = [...new Set(this.newFilter.map(p => p.description))];
       this.dataSource.data[i].account= this.accountnames;
       this.dataSource.data[i].vendor=this.vendor
       this.dataSource.data[i].flag='N'
       this.dataSource.data[i].flagNumber=3;
       const timeout = 2000;
const dialogRef = this.dialog.open(UpdationdescriptionComponent)
let instance = dialogRef.componentInstance;
  instance.records=this.newFilter.length
    setTimeout(() => {
       dialogRef.close();
    }, timeout)
this.UpdatedRecord=this.newFilter.length;
    }
    
  }
  closecompletedialogbox()
  {
    this.dialogRef.close({data:this.dataSource.data});
  }
  updateRecords()
  {
    var unique = [...new Set(this.newFilter.map(p => p.description))];
   
  {
for (let j=0;j<this.pdfopencloseService.displayDataForBankStatement().length;j++)
{  
  for (let k=0;k<unique.length;k++)
  {
    let testing:any=this.pdfopencloseService.displayDataForBankStatement().filter(a=>a.description===unique[k])
    for (let z=0;z<testing.length;z++)
    {
    testing[z]["account"]=this.newFilter.filter(a=>a.description===unique[k])[0].account;
    testing[z]["vendor"]=this.newFilter.filter(a=>a.description===unique[k])[0].vendor;
    testing[z]["flag"]='N';
    }
  
  }
}

const timeout = 3000;
const dialogRef = this.dialog.open(UpdationdescriptionComponent)
let instance = dialogRef.componentInstance;
  instance.records=this.newFilter.length
    setTimeout(() => {
       dialogRef.close();
    }, timeout)
this.UpdatedRecord=this.newFilter.length;
  }
  }

  closedialogbox()
  {
    this.dialogRef.close();
  }
 
}
