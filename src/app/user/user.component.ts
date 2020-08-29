import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent  {
  websiteList: any = ['Desktop','Online']

  constructor(private router: Router) { }

  get f(){
    return this.form.controls;
  }
  form = new FormGroup({
    website: new FormControl('', Validators.required)
  });
 
  submit(){
    console.log(this.form.value); debugger;
 
 this.router.navigate(['/excel']); debugger;
  }
  changeWebsite(e) {
    console.log(e.target.value);
  }

  ngOnInit(): void {
  }

}
