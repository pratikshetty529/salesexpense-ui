import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import {ExceluploadComponent} from '../excelupload/excelupload.component';
import {StepperexcelautomationComponent} from '../stepperexcelautomation/stepperexcelautomation.component';
import {NewDisplayVendorListComponent} from '../new-display-vendor-list/new-display-vendor-list.component';
import {UploadFileComponent} from '../upload-file/upload-file.component'
import {ErrorhandlerComponent} from '../errorhandler/errorhandler.component';
import {LoaderComponent} from '../shared/loader/loader.component';
import { DialogboxComponentComponent } from '../dialogbox-component/dialogbox-component.component';
import { DropdownComponentComponent } from '../dropdown-component/dropdown-component.component';

const routes: Routes = [
  {path : '', component : StepperexcelautomationComponent},
  {path : 'excel', component : ExceluploadComponent},
  {path : 'stepper', component: StepperexcelautomationComponent },
  {path:'uploadfile', component: UploadFileComponent, children:[{
  path: 'vendorlist1', component: NewDisplayVendorListComponent }]},
  {path : 'error', component: ErrorhandlerComponent},
  {path :'loader', component: LoaderComponent },
  {path : 'dropdown', component:DropdownComponentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
