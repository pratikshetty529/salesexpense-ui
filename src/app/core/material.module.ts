import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {MatStepperModule} from '@angular/material/stepper';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import {NgxMatFileInputModule } from '@angular-material-components/file-input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatGridTileHarness} from '@angular/material/grid-list/testing';
import {MatSortModule} from '@angular/material/sort';
// import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
  CommonModule, 
  BrowserModule,
  MatToolbarModule,
  MatButtonModule, 
  MatCardModule,
  MatInputModule,
  MatDialogModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatStepperModule,
  NgxMatFileInputModule,
  MatFormFieldModule,
  MatGridListModule,
  MatGridTileHarness,
  MatSortModule,
  
  ],
  exports: [
  CommonModule,
  BrowserModule,
   MatToolbarModule, 
   MatButtonModule, 
   MatCardModule, 
   MatInputModule, 
   MatDialogModule, 
   MatTableModule, 
   MatMenuModule,
   MatIconModule,
   MatProgressSpinnerModule,
   MatPaginatorModule,
   MatStepperModule,
   NgxMatFileInputModule,
   MatFormFieldModule,
   MatGridListModule,
   MatGridTileHarness,
   MatSortModule,
   
   ],
})
export class CustomMaterialModule { }