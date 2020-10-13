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
import { MatSelectModule } from '@angular/material/select';
import { PdfUploadComponent } from './pdf-upload/pdf-upload.component';
import { OpeningClosingValidationComponent } from './opening-closing-validation/opening-closing-validation.component';
import { DisplayCleanedBankStatementComponent } from './display-cleaned-bank-statement/display-cleaned-bank-statement.component';
import { DisplayMessageComponent } from './display-message/display-message.component';
import {MatAutocompleteModule } from '@angular/material/autocomplete';
 import {MatFormFieldModule} from '@angular/material/form-field';
 import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { DropdownComponentComponent } from './dropdown-component/dropdown-component.component';
import { DialogboxComponentComponent } from './dialogbox-component/dialogbox-component.component';
import { AutocompletePopupComponent } from './autocomplete-popup/autocomplete-popup.component';
import { DisplayNewVendorsComponent } from './display-new-vendors/display-new-vendors.component';
import { DisplayNewMasterVendorsComponent } from './display-new-master-vendors/display-new-master-vendors.component';
import { SalesExpenseSendComponent } from './sales-expense-send/sales-expense-send.component';
import { DisplaysalesExpenseComponent } from './displaysales-expense/displaysales-expense.component';
import { DisplayExpenseComponent } from './display-expense/display-expense.component';
import { ValidationCleanBankStatementComponent } from './validation-clean-bank-statement/validation-clean-bank-statement.component';
import { EditComponentComponent } from './edit-component/edit-component.component';
import { OpeningDropdownComponent } from './opening-dropdown/opening-dropdown.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { OpeningClosingErrorComponent } from './opening-closing-error/opening-closing-error.component';
import { FileUploadFailureComponent } from './file-upload-failure/file-upload-failure.component';
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
    PdfUploadComponent,
    OpeningClosingValidationComponent,
    DisplayCleanedBankStatementComponent,
    DisplayMessageComponent,
    DropdownComponentComponent,
    DialogboxComponentComponent,
    AutocompletePopupComponent,
    DisplayNewVendorsComponent,
    DisplayNewMasterVendorsComponent,
    SalesExpenseSendComponent,
    DisplaysalesExpenseComponent,
    DisplayExpenseComponent,
    ValidationCleanBankStatementComponent,
    EditComponentComponent,
    OpeningDropdownComponent,
    OpeningClosingErrorComponent,
    FileUploadFailureComponent,
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
    MatTabsModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatTableExporterModule
 ],
  providers: [LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
