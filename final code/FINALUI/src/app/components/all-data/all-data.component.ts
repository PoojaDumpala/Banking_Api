import { Component, OnInit } from '@angular/core';
import { AllData } from 'src/app/models/model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-all-data',
  templateUrl: './all-data.component.html',
  styleUrls: ['./all-data.component.css']
})
export class AllDataComponent implements OnInit {

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }
  allData: AllData;
  async getAllData() {
    this.allData = await this.dataService.showDB();
    console.log('DATA', this.allData);
  }
}
