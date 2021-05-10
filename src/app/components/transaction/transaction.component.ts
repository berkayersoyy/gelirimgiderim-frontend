import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Room } from 'src/app/models/room';
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
  transactions:Transaction[];
  currentRoom:Room;

  constructor(
    private transactionService: TransactionService,
    private toastrService: ToastrService,
    private routerService: RouterService,
    private roomService:RoomService,
  ) {}

  ngOnInit(): void {

  }

}
