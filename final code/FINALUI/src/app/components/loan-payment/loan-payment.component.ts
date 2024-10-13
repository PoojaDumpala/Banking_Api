import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loan, NewLoanPayment } from 'src/app/models/model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-loan-payment',
  templateUrl: './loan-payment.component.html',
  styles: [
  ]
})
export class LoanPaymentComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private router: Router,
  ) { }

  loanNo: string;
  amount: number;
  loans: Loan[] = [];

  ngOnInit(): void {
    this.getLoans();
  }
  async getLoans() {
    this.loans = await this.dataService.getLoans();
  }
  async onSubmit() {
    const payment = new NewLoanPayment();
    payment.loanno = this.loanNo;
    payment.amount = this.amount;
    await this.dataService.addLoanPayment(payment);
    this.router.navigate(['/']);
  }

}
