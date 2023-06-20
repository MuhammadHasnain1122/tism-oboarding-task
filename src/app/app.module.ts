import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DynamicFormsPrimeNGUIModule } from '@ng-dynamic-forms/ui-primeng';
import {TableModule} from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ToastModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DynamicFormsPrimeNGUIModule,
    TableModule,
    MultiSelectModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
