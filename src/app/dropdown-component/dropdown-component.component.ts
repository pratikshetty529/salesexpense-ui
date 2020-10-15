import { Component,ElementRef, OnInit } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {DropdowndialogService} from '../service/dropdowndialog.service'
@Component({
  selector: 'app-dropdown-component',
  templateUrl: './dropdown-component.component.html',
  styleUrls: ['./dropdown-component.component.css']
})

export class DropdownComponentComponent {
  selectedFood1: string;
  selectedFood2: string;
 constructor(private elementRef: ElementRef,
  private dropdown:DropdowndialogService) { }
  foods = [
    {value: 'Online', viewValue: 'Online'},
     {value: 'Desktop', viewValue: 'Desktop'},
  ];

  onFoodSelection1() {
    console.log(this.selectedFood1);
  }

  onFoodSelection2() {
this.dropdown.setflag(true);
  
    this.ngOndestroy();
  }
  ngOndestroy() {
    this.elementRef.nativeElement.remove();
  }
  // submitted = false;
  // selectedFood2: string;

  // foods = [
  //   {value: 'Online', viewValue: 'Online'},
  //   {value: 'Desktop', viewValue: 'Desktop'},
    
  // ];
  // public versionMethods : string[]=['Online','Desktop']
  // constructor(private elementRef: ElementRef) { }
  
 
  // onSubmit() {
  //   this.submitted = true;
  //  // alert(JSON.stringify(this.versionMethodsForm.value))
    
  // }
 
  // onFoodSelection2() {
  
  //   console.log(this.selectedFood2);
  //   console.log(JSON.stringify(this.selectedFood2))
  // }

}
