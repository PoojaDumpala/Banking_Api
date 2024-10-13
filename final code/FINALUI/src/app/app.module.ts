import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';



import { AppComponent } from './app.component';
import { AllDataComponent } from './components/all-data/all-data.component';
import { UploadDataComponent } from './components/upload-data/upload-data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { AddLoanComponent } from './components/add-loan/add-loan.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { LoanPaymentComponent } from './components/loan-payment/loan-payment.component';
import { AddAccountComponent } from './components/add-account/add-account.component';
import { OpenBranchComponent } from './components/open-branch/open-branch.component';
import { BranchReportComponent } from './components/branch-report/branch-report.component';


const routes = [
  { path: '', component: AllDataComponent },
  { path: 'upload', component: UploadDataComponent },
  { path: 'addcustomer', component: AddCustomerComponent },
  { path: 'addloan', component: AddLoanComponent },
  { path: 'addmanager', component: AddEmployeeComponent },
  { path: 'payloan', component: LoanPaymentComponent },
  { path: 'addaccount', component: AddAccountComponent },
  { path: 'openbranch', component: OpenBranchComponent },
  { path: 'branchreport', component: BranchReportComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AllDataComponent,
    UploadDataComponent,
    AddCustomerComponent,
    AddLoanComponent,
    AddEmployeeComponent,
    LoanPaymentComponent,
    AddAccountComponent,
    OpenBranchComponent,
    BranchReportComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatSidenavModule,
    MatToolbarModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
