import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Branch, Employee, NewManager } from 'src/app/models/model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styles: [
  ]
})
export class AddEmployeeComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private router: Router,
  ) { }

  ssn: string;
  name: string;
  telephoneNo: string;
  managerSsn: string;
  startDate: string;
  branchName: string;
  branches: Branch[] = [];
  managers: Employee[] = [];
  ngOnInit(): void {
    this.getBranches();
    this.getManagers();
  }
  async getBranches() {
    this.branches = await this.dataService.getBranches();
  }
  async getManagers() {
    this.managers = await this.dataService.getManagers();
  }
  async onSubmit() {
    const manager = new NewManager();
    manager.ssn = this.ssn;
    manager.name = this.name;
    manager.telephoneno = this.telephoneNo;
    manager.managerssn = this.managerSsn || null;
    manager.startdate = this.startDate;
    manager.branchname = this.branchName;
    await this.dataService.addManager(manager);
    this.router.navigate(['/']);
  }

}
