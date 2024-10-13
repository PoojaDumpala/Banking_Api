import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(fb: FormBuilder) {
  }

  links = [
    { link: '/', label: 'All Data' },
    { link: '/upload', label: 'Upload CSV' },
    { link: '/addcustomer', label: 'Add Customer' },
    { link: '/addloan', label: 'Add Loan' },
    { link: '/addmanager', label: 'Add Manager' },
    { link: '/payloan', label: 'Loan Payment' },
    { link: '/addaccount', label: 'Add Savings Account' },
    { link: '/openbranch', label: 'Open New Branch' },
    { link: '/branchreport', label: 'Branch Report' },
  ];
}
