import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bank, NewBranch } from 'src/app/models/model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-open-branch',
  templateUrl: './open-branch.component.html',
  styles: [
  ]
})
export class OpenBranchComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  bankId: number;
  branchName: string;
  city: string;

  banks: Bank[] = [];

  ngOnInit(): void {
    this.getBanks();
  }
  async getBanks() {
    this.banks = await this.dataService.getBanks();
  }
  async onSubmit() {
    const branch = new NewBranch();
    branch.bankid = this.bankId;
    branch.branchname = this.branchName;
    branch.city = this.city;
    await this.dataService.addBranch(branch);
    this.router.navigate(['/']);
  }

}
