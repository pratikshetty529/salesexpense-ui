import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import {CustomMaterialModule} from './material.module';
import { AppRoutingModule } from './core/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {ExceluploadComponent} from './excelupload/excelupload.component';
import {StepperexcelautomationComponent} from './stepperexcelautomation/stepperexcelautomation.component';
import { ComponentNameComponent } from './component-name/component-name.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { NewDisplayVendorListComponent } from './new-display-vendor-list/new-display-vendor-list.component';
import { HeaderAutomationComponent } from './header-automation/header-automation.component';
import { FooterAutomationComponent } from './footer-automation/footer-automation.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { ErrorhandlerComponent } from './errorhandler/errorhandler.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoaderService} from './service/loader.service'
import {LoaderInterceptor} from './interceptor/interceptor';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    ExceluploadComponent,
    StepperexcelautomationComponent,
    ComponentNameComponent,
    UploadFileComponent,
    NewDisplayVendorListComponent,
    HeaderAutomationComponent,
    FooterAutomationComponent,
    ErrorhandlerComponent,
    LoaderComponent
    
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    JwPaginationModule 
 ],
  providers: [LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
