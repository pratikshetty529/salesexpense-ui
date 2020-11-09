import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdowndialogService {

  constructor() { }
showhidedialog :boolean=false;
  setflag(visibility :boolean)
  {
this.showhidedialog=visibility
if (this.showhidedialog===true)
{
  //this.dialogox.ngOndestroy();
}
  }
readFlag()
{
  return this.showhidedialog;

}
}
