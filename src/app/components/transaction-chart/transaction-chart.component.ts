import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import {
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
  SingleDataSet,
} from 'ng2-charts';
import { Category } from 'src/app/models/category';
import { Room } from 'src/app/models/room';
import { Transaction } from 'src/app/models/transaction';
import { CategoryService } from 'src/app/services/category.service';
import { TransactionService } from 'src/app/services/transaction.service';
@Component({
  selector: 'app-transaction-chart',
  templateUrl: './transaction-chart.component.html',
  styleUrls: ['./transaction-chart.component.css'],
})
export class TransactionChartComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'doughnut';
  public pieChartLegend = true;
  public pieChartPlugins: any = [];
  dataLoaded=false;
  categories: Category[] = [];
  sharedCategories: Category[] = [];
  transactions: Transaction[] = [];
  @Input() currentRoom: Room;

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.classifyTransactions();
  }
  getTransactions() {
    return this.transactionService
      .getTransactions(this.currentRoom.id)
      .toPromise();
  }
  getCategories() {
    return this.categoryService
      .getCategories(this.currentRoom.id)
      .toPromise();
  }
  getSharedCategories(){
    return this.categoryService.getSharedCategories().toPromise();
  }
  async classifyTransactions() {
    this.transactions = await (await this.getTransactions()).data;
    this.sharedCategories = await (await this.getSharedCategories()).data;
    this.categories = await (await this.getCategories()).data;
    for (let category of this.sharedCategories) {
      var sum = 0;
      for (let transaction of this.transactions) {
        if (transaction.categoryId == category.id) {
          sum = sum + transaction.amount;
        }
      }
      this.pieChartLabels.push(category.categoryName);
      this.pieChartData.push(sum);
    }
    for (let category of this.categories) {
      var sum = 0;
      for (let transaction of this.transactions) {
        if (transaction.categoryId == category.id) {
          sum = sum + transaction.amount;
        }
      }
      this.pieChartLabels.push(category.categoryName);
      this.pieChartData.push(sum);
    }
    this.dataLoaded=true;
  }
}
