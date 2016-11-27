//import './rxjs-extensions';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }  from './app.component';
import { CompaniesComponent }      from './companies.component';
import { CompanyService }          from './company.service';
import { CompanyDetailComponent }          from './company-detail.component';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule,
    HttpModule,
    AppRoutingModule ],
  declarations: [ 
    AppComponent,
    CompaniesComponent,
    CompanyDetailComponent ],
  providers: [CompanyService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
