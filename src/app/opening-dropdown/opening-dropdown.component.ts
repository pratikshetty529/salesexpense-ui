import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogboxComponentComponent } from '../dialogbox-component/dialogbox-component.component';
@Component({
  selector: 'app-opening-dropdown',
  templateUrl: './opening-dropdown.component.html',
  styleUrls: ['./opening-dropdown.component.css']
})
export class OpeningDropdownComponent implements OnInit {
  selectedFood2: string;
  public buttonName:any;
  constructor(private dialogRef: MatDialogRef<DialogboxComponentComponent >) { }
  foods = [
    {value: 'Online', viewValue: 'Online'},
    {value: 'Desktop', viewValue: 'Desktop'},
  ];
  ngOnInit(): void {
  }
  onFoodSelection2() {
  
    let buttonname=this.selectedFood2;
 this.dialogRef.close({buttonname})
  }
}
