import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { UserComponent } from '../user/user.component';
import {LoginComponent} from '../login/login.component';
import {ExceluploadComponent} from '../excelupload/excelupload.component';
import {StepperexcelautomationComponent} from '../stepperexcelautomation/stepperexcelautomation.component';
import {NewDisplayVendorListComponent} from '../new-display-vendor-list/new-display-vendor-list.component';
import {UploadFileComponent} from '../upload-file/upload-file.component'
import {ErrorhandlerComponent} from '../errorhandler/errorhandler.component';
import {LoaderComponent} from '../shared/loader/loader.component';
const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent },
  {path : '', component : StepperexcelautomationComponent},
  {path : 'excel', component : ExceluploadComponent},
  {path : 'stepper', component: StepperexcelautomationComponent },
  //{path: 'vendorlist', component: NewDisplayVendorListComponent },
  {path:'uploadfile', component: UploadFileComponent, children:[{
    path: 'vendorlist1', component: NewDisplayVendorListComponent }]},
{path : 'error', component: ErrorhandlerComponent},
{path :'loader', component: LoaderComponent }

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
