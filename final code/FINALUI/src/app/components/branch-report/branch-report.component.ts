import { Component, OnInit } from '@angular/core';
import { Branch, FormattedBranchReport } from 'src/app/models/model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-branch-report',
  templateUrl: './branch-report.component.html',
  styles: [
  ]
})
export class BranchReportComponent implements OnInit {

  constructor(
    private dataService: DataService,
  ) { }

  branchName: string = null;
  branches: Branch[] = [];
  branchReport: FormattedBranchReport[] = [];
  // branchReport: FormattedBranchReport[] = [
  //   { customer: 'RAHUL', accounts: [], loans: [] }
  // ];

  ngOnInit(): void {
    this.getBranches();
  }
  async getBranches() {
    this.branches = await this.dataService.getBranches();
  }

  async onSubmit() {
    this.branchReport = await this.dataService.getBranchReport(this.branchName);
  }
  onExpand(report: FormattedBranchReport) {
    const show = !report.show;
    this.branchReport.map(x => x.show = false);
    report.show = show;
  }


}
