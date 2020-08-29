import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Router} from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) { }
username: string;
password: string;
  ngOnInit() {
  }
  login() : void {
    if(this.username == 'admin' && this.password == 'admin'){
     //this.router.navigate(["excel"]);
     this.router.navigate(["user"]);

  debugger;
    }else {
      alert("Invalid credentials");
    }
  }
  }

  

