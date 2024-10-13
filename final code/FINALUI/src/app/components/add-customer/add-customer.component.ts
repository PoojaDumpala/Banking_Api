import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Branch, Employee, NewCustomer } from 'src/app/models/model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styles: [
  ]
})
export class AddCustomerComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private router: Router,
  ) { }

  ssn: string;
  customerName: string;
  address: string;
  street: string;
  city: string;
  essn: string;
  associateType: string;
  employees: Employee[] = [];

  branchName: string;

  accountNo: string;
  accountType: string;
  branches: Branch[] = [];
  accountBalance: number;
  interestRate: number = null;
  overdraftAmount: number = null;


  loanNo: string;
  loanAmount: number;


  ngOnInit(): void {
    this.getEmployees();
    this.getBranches();
  }
  
  async getBranches() {
    this.branches = await this.dataService.getBranches();
  }
  async getEmployees() {
    this.employees = await this.dataService.getEmployees();
  }
  async onSubmit() {
    const customer = new NewCustomer();
    customer.ssn = this.ssn;
    customer.name = this.customerName;
    customer.address = this.address;
    customer.street = this.street;
    customer.city = this.city;
    customer.essn = this.essn;
    customer.associatetype = this.associateType;
    customer.branchname = this.branchName;
    customer.accountno = this.accountNo;
    customer.balance = this.accountBalance;
    customer.accounttype = this.accountType;
    customer.interestrate = this.interestRate;
    customer.overdraftamount = this.overdraftAmount;
    customer.loanno = this.loanNo;
    customer.loanamount = this.loanAmount;
    await this.dataService.addCustomer(customer);
    this.router.navigate(['/']);
  }


}
