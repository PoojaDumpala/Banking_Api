

export interface Bank {
    ID: number;
    NAME: string;
}
export interface Branch {
    BRANCH_NAME: string;
    BANK_ID: number;
    CITY: string;
}
export interface Employee {
    SSN: string;
    NAME: string;
    TELEPHONE_NO: string;
    MANAGER_SSN: string;
    START_DATE: string;
    BRANCH_NAME: string;
    IS_MANAGER: any;
    // Is_Manager: boolean;
}
export interface Customer {
    SSN: string;
    NAME: string;
    ADDRESS: string;
    STREET: string;
    CITY: string;
    ESSN: string;
    ASSOCIATE_TYPE: string;
}
export interface Dependent {
    EMPLOYEE_SSN: string;
    NAME: string;
    RELATION: string;
}
export interface Account {
    ACCOUNT_NO: string;
    ACCOUNT_TYPE: string;
    BRANCH_NAME: string;
    BALANCE: number;
    INTEREST_RATE: number;
    OVERDRAFT_AMOUNT: number;
}
export interface AccountHolder {
    CUSTOMER_SSN: string;
    ACCOUNT_NO: string;
    RECENT_ACCESS_DATE: string;
}
export interface Loan {
    LOAN_NO: string;
    BRANCH_NAME: string;
    LOAN_AMOUNT: number;
    pending?: number;
}
export interface LoanHolder {
    LOAN_NO: string;
    CUSTOMER_SSN: string;
}
export interface LoanPayment {
    LOAN_NO: string;
    PAYMENT_DATE: string;
    AMOUNT: number;
    LOAN_PAYMENT_NO: string;
}


export interface AllData {
    banks: Bank[];
    branches: Branch[];
    employees: Employee[];
    customers: Customer[];
    dependents: Dependent[];
    accounts: Account[];
    accountholders: AccountHolder[];
    loans: Loan[];
    loanholders: LoanHolder[];
    loanpayments: LoanPayment[];
}
export interface BranchReport {
    loans: Loan[];
    accounts: Account[];
    customers: Customer[];
    accountholders: AccountHolder[];
    loanholders: LoanHolder[];
    loanpayments: LoanPayment[];
}
export interface FormattedBranchReport {
    customer: string;
    loans: Loan[];
    accounts: Account[];
    show?: boolean;
}

export class NewCustomer {
    ssn = '';
    name = '';
    address = '';
    street = '';
    city = '';
    essn = '';
    associatetype = '';

    branchname = '';
    accountno = '';
    balance = 0;
    accounttype = '';
    interestrate = null;
    overdraftamount = null;

    loanno = '';
    loanamount = 0;
}
export class NewLoan {
    loanno = '';
    branchname = '';
    loanamount = 0;
    customerssn = '';
}
export class NewManager {
    ssn = '';
    name = '';
    telephoneno = '';
    managerssn = '';
    startdate = '';
    branchname = '';
}
export class NewLoanPayment {
    loanno = '';
    amount = 0;
}
export class NewSavingsAccount {
    accountno = '';
    accounttype = 'SAVINGS';
    branchname = '';
    balance = 0;
    interestrate = 0;
    customerssn = '';
}

export class NewBranch {
    branchname = '';
    bankid = 0;
    city = '';
}