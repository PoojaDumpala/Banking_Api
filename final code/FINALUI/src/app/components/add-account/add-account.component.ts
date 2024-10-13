import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Branch, Customer, NewSavingsAccount } from 'src/app/models/model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styles: [
  ]
})
export class AddAccountComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  accountNo: string;
  branchName: string;
  balance: number;
  interestRate: number;
  customerssn: string;
  branches: Branch[] = [];
  customers: Customer[] = [];

  ngOnInit(): void {
    this.getBranches();
    this.getCustomers();
  }
  async getBranches() {
    this.branches = await this.dataService.getBranches();
  }
  async getCustomers() {
    this.customers = await this.dataService.getCustomers();
  }

  async onSubmit() {
    const account = new NewSavingsAccount();
    account.accountno = this.accountNo;
    account.branchname = this.branchName;
    account.balance = this.balance;
    account.interestrate = this.interestRate;
    account.customerssn = this.customerssn;
    await this.dataService.addSavingsAccount(account);
    this.router.navigate(['/']);
  }



}
