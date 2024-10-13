import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { AllData, Bank, Branch, BranchReport, Customer, Employee, FormattedBranchReport, Loan, LoanHolder, NewBranch, NewCustomer, NewLoan, NewLoanPayment, NewManager, NewSavingsAccount } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  prefix = 'http://localhost:5000/';

  uploadUrls = {
    bank: 'uploadbanks',
    branch: 'uploadbranches',
    employee: 'uploademployees',
    customer: 'uploadcustomers',
    dependent: 'uploaddependents',
    account: 'uploadaccounts',
    accountholder: 'uploadaccountholders',
    loan: 'uploadloans',
    loanholder: 'uploadloanholders',
    loanpayment: 'uploadloanpayments',
  }

  async uploader(file: File, uploadType: string) {
    const fd = new FormData();
    fd.append('file', file);
    const suffix = this.uploadUrls[uploadType];
    await lastValueFrom(this.http.post(`${this.prefix}${suffix}`, fd));
  }

  async showDB() {
    return await lastValueFrom(this.http.get(`${this.prefix}alldata`) as Observable<AllData>);
  }
  async getBranches() {
    return await lastValueFrom(this.http.get(`${this.prefix}getbranches`) as Observable<Branch[]>);
  }
  async getCustomers() {
    return await lastValueFrom(this.http.get(`${this.prefix}getcustomers`) as Observable<Customer[]>);
  }
  async getEmployees() {
    return await lastValueFrom(this.http.get(`${this.prefix}getemployees`) as Observable<Employee[]>);
  }
  async getManagers() {
    return await lastValueFrom(this.http.get(`${this.prefix}getmanagers`) as Observable<Employee[]>);
  }
  async getLoans() {
    return await lastValueFrom(this.http.get(`${this.prefix}getloans`) as Observable<Loan[]>);
  }
  async getBanks() {
    return await lastValueFrom(this.http.get(`${this.prefix}getbanks`) as Observable<Bank[]>);
  }
  async getLoanHolders() {
    return await lastValueFrom(this.http.get(`${this.prefix}getloanholders`) as Observable<LoanHolder[]>);
  }
  async getBranchReport(branchName: string) {
    const data = await lastValueFrom(this.http.get(`${this.prefix}getbranchreport?branchname=${branchName}`) as Observable<BranchReport>);
    let report: FormattedBranchReport[] = [];
    data.customers.forEach(c => {
      const customerLoans = data.loanholders.reduce((prev, curr) => {
        if (curr.CUSTOMER_SSN === c.SSN) {
          prev.push(curr.LOAN_NO);
        }
        return prev;
      }, []);
      const customerAccs = data.accountholders.reduce((prev, curr) => {
        if (curr.CUSTOMER_SSN === c.SSN) {
          prev.push(curr.ACCOUNT_NO);
        }
        return prev;
      }, []);
      const loans = data.loans.filter(l => customerLoans.includes(l.LOAN_NO));
      const accounts = data.accounts.filter(l => customerAccs.includes(l.ACCOUNT_NO));
      loans.map(l => {
        const loanPaymentAmount = data.loanpayments.reduce((sum, x) => {
          if (x.LOAN_NO === l.LOAN_NO) {
            sum += x.AMOUNT;
          }
          return sum;
        }, 0);
        l.pending = l.LOAN_AMOUNT - loanPaymentAmount;
      });
      report.push({
        customer: c.NAME,
        loans: loans,
        accounts: accounts,
      });
    });
    report = report.filter(x => (x.accounts.length > 0) || (x.loans.length > 0))
    return report;
  }



  async addCustomer(data: NewCustomer) {
    await lastValueFrom(this.http.post(`${this.prefix}addcustomer`, data));
  }
  async addLoan(data: NewLoan) {
    await lastValueFrom(this.http.post(`${this.prefix}addloan`, data));
  }
  async addManager(data: NewManager) {
    await lastValueFrom(this.http.post(`${this.prefix}addmanager`, data));
  }
  async addLoanPayment(data: NewLoanPayment) {
    await lastValueFrom(this.http.post(`${this.prefix}addloanpayment`, data));
  }
  async addSavingsAccount(data: NewSavingsAccount) {
    await lastValueFrom(this.http.post(`${this.prefix}addsavingsaccount`, data));
  }
  async addBranch(data: NewBranch) {
    await lastValueFrom(this.http.post(`${this.prefix}addbranch`, data));
  }



}
