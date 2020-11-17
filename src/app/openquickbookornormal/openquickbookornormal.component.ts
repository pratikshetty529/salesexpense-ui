import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-openquickbookornormal',
  templateUrl: './openquickbookornormal.component.html',
  styleUrls: ['./openquickbookornormal.component.css']
})
export class OpenquickbookornormalComponent  {
public slideOpen:boolean;
  constructor(private router: Router ) { }

  ngOnInit(): void {
  }
  getChevronStyle()
  {
    if(this.slideOpen) {
      return { 'transform': 'rotate(90deg)' }
  } else {
      return { 'transform': 'rotate(180deg)' }
  }
}
  openDialog() {
    this.router.navigate(['stepper'])
    
}

deleteItem() {
 
  var myWindow = window.open("https://c37.qbo.intuit.com/qbo37/login?webredir/", "myWindow", "width=900,height=800");

}
}