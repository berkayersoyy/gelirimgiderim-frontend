import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Room } from 'src/app/models/room';
import { RoomForGet } from 'src/app/models/roomForGet';
import { Transaction } from 'src/app/models/transaction';
import { RoomService } from 'src/app/services/room.service';
import { RouterService } from 'src/app/services/router.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  dataLoaded = false;
  transactions: Transaction[];
  @Input() currentRoom: Room;

  constructor(
    private transactionService: TransactionService,
    private toastrService: ToastrService,
    private routerService: RouterService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions() {
    if (this.currentRoom == null) {
      return;
    }
    this.transactionService.getTransactions(this.currentRoom.id).subscribe(
      (response) => {
        this.transactions = response.data;
        this.dataLoaded = true;
      },
      (responseError) => {
        console.log(responseError);
        this.toastrService.error(responseError.error.message);
      }
    );
  }
  //TODO add transactions buttons delete update add
  addTransaction(transaction: Transaction) {
    this.transactionService.add(transaction).subscribe((response) => {
      this.routerService.refreshPage();
      //TODO check if needs to be refreshed.
    });
  }
  deleteTransaction(transaction: Transaction) {
    this.transactionService.delete(transaction).subscribe((response) => {
      this.routerService.refreshPage();
      //TODO check if needs to be refreshed.
    });
  }
  updateTransaction(transaction: Transaction) {
    this.transactionService.update(transaction).subscribe((response) => {
      this.routerService.refreshPage();
      //TODO check if needs to be refreshed.
    });
  }
}
