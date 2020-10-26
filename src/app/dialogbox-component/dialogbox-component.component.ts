import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {DropdownComponentComponent} from '../dropdown-component/dropdown-component.component';
import {MatInputModule } from '@angular/material/input'
import {MatSelectModule} from '@angular/material/select';
@Component({
  selector: 'app-dialogbox-component',
  templateUrl: './dialogbox-component.component.html',
  styleUrls: ['./dialogbox-component.component.css']
})
export class DialogboxComponentComponent implements OnInit {

  constructor(public matDialog: MatDialog,
    private elementRef: ElementRef,) { }

  ngOnInit(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "250px";
    dialogConfig.width = "700px";
    const modalDialog = this.matDialog.open(DropdownComponentComponent, dialogConfig);
    
    
  }
  ngOndestroy() {
    this.elementRef.nativeElement.remove();
  }

}
