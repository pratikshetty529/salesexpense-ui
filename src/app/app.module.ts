import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import {CustomMaterialModule} from './material.module';
import { AppRoutingModule } from './core/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ExceluploadComponent} from './excelupload/excelupload.component';
import {StepperexcelautomationComponent} from './stepperexcelautomation/stepperexcelautomation.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { NewDisplayVendorListComponent } from './new-display-vendor-list/new-display-vendor-list.component';
import { HeaderAutomationComponent } from './header-automation/header-automation.component';
import { ErrorhandlerComponent } from './errorhandler/errorhandler.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoaderService} from './service/loader.service'
import {LoaderInterceptor} from './interceptor/interceptor';
import { MatTabsModule } from '@angular/material/tabs';
@NgModule({
  declarations: [
    AppComponent,
    ExceluploadComponent,
    StepperexcelautomationComponent,
    UploadFileComponent,
    NewDisplayVendorListComponent,
    HeaderAutomationComponent,
    ErrorhandlerComponent,
    LoaderComponent,
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
    MatTabsModule
 ],
  providers: [LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
