import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Branch, Customer, Loan, NewBranch, NewLoan } from 'src/app/models/model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-loan',
  templateUrl: './add-loan.component.html',
  styles: [
  ]
})
export class AddLoanComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private router: Router,
  ) { }

  branchName: string;
  loanNo: string;
  loanAmount: number;
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
    const loan = new NewLoan();
    loan.branchname = this.branchName;
    loan.customerssn = this.customerssn;
    loan.loanamount = this.loanAmount;
    loan.loanno = this.loanNo;
    await this.dataService.addLoan(loan);
    // this.router.navigate(['/']);
    this.reset();
  }

  reset(){
    this.branchName = null;
    this.loanAmount = null;
    this.loanNo = null;
    this.onCustomerSubmit();
  }
  showLoans = false;
  loans: Loan[] = [];
  async onCustomerSubmit() {
    const loans = await this.dataService.getLoans();
    const holders = await this.dataService.getLoanHolders();
    const customerLoanNos = holders.reduce((loanNos, holder) => {
      if (holder.CUSTOMER_SSN === this.customerssn) {
        loanNos.push(holder.LOAN_NO);
      }
      return loanNos;
    }, []);
    this.loans = loans.filter(x => customerLoanNos.includes(x.LOAN_NO));
  }

}
