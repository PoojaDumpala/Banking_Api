import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-upload-data',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.css']
})
export class UploadDataComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private router: Router,
    ) { }

  tables = [
    { key: 'bank', label: 'Bank' },
    { key: 'branch', label: 'Branch' },
    { key: 'employee', label: 'Employee' },
    { key: 'customer', label: 'Customer' },
    { key: 'dependent', label: 'Dependent' },
    { key: 'account', label: 'Account' },
    { key: 'accountholder', label: 'Account Holder' },
    { key: 'loan', label: 'Loan' },
    { key: 'loanholder', label: 'Loan Holder' },
    { key: 'loanpayment', label: 'Loan Payment' },
  ];
  uploadType: string;
  @ViewChild('fileUpload', { static: true }) fileUploadRef: ElementRef<HTMLInputElement>;

  ngOnInit(): void { }

  async onUpload() {
    const element = this.fileUploadRef.nativeElement;
    const file = element.files[0];
    await this.dataService.uploader(file, this.uploadType);
    this.router.navigate(['/']);
  }

  

}
