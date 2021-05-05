import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  transactions:Transaction[]=[];
  constructor(private transactionService:TransactionService) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions(){
    this.transactionService.getTransactionTest().subscribe(response=>{
      this.transactions=response.data;
    }
    );
  }
  log(val:any){
    console.log(val)
  }

}
