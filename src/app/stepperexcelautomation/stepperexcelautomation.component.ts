import { Component, OnInit } from '@angular/core';
import {MatListModule} from '@angular/material/list'
import {SplashScreenComponent} from '../splash-screen/splash-screen.component'
@Component({
  selector: 'app-stepperexcelautomation',
  templateUrl: './stepperexcelautomation.component.html',
  styleUrls: ['./stepperexcelautomation.component.css']
})
export class StepperexcelautomationComponent implements OnInit {
  public front:boolean=false;
  public show:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

}
