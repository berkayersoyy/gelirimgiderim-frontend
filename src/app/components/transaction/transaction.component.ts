import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Room } from 'src/app/models/room';
import { Transaction } from 'src/app/models/transaction';
import { TransactionDetailDto } from 'src/app/models/transactionDetailDto';
import { RouterService } from 'src/app/services/router.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { AddTransactionFormModalComponent } from '../add-transaction-form-modal/add-transaction-form-modal.component';
import { ArrangeCategoryFormModalComponent } from '../arrange-category-form-modal/arrange-category-form-modal.component';
import { CategoryPanelFormModalComponent } from '../category-panel-form-modal/category-panel-form-modal.component';
import { TransactionSettingsModalComponent } from '../transaction-settings-modal/transaction-settings-modal.component';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  dataLoaded = false;
  transactions: TransactionDetailDto[];
  @Input() currentRoom: Room;

  constructor(
    private transactionService: TransactionService,
    private toastrService: ToastrService,
    private routerService: RouterService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions() {
    if (this.currentRoom == null) {
      return;
    }
    this.transactionService
      .getTransactionDetailDtos(this.currentRoom.id)
      .subscribe(
        (response) => {
          this.transactions = response.data;
          this.dataLoaded = true;
        },
        (responseError) => {
          this.toastrService.error(responseError);
        }
      );
  }
  orderTransactionsForTime() {
    this.transactions.reverse();
  }
  addTransaction(transaction: Transaction) {
    this.transactionService.add(transaction).subscribe((response) => {
      this.routerService.refreshPage();
    });
  }
  deleteTransaction(transaction: Transaction) {
    this.transactionService.delete(transaction).subscribe((response) => {
      this.routerService.refreshPage();
    });
  }
  updateTransaction(transaction: Transaction) {
    this.transactionService.update(transaction).subscribe((response) => {
      this.routerService.refreshPage();
    });
  }

  openTransactionSettingModal(transaction: TransactionDetailDto) {
    const modalRef = this.modalService.open(TransactionSettingsModalComponent);
    modalRef.componentInstance.transaction = transaction;
    modalRef.componentInstance.currentRoom = this.currentRoom;
  }
  openAddTransactionModal() {
    const modalRef = this.modalService.open(AddTransactionFormModalComponent);
    modalRef.componentInstance.currentRoom = this.currentRoom;
  }
  openCategoriesPanel() {
    const modalRef = this.modalService.open(CategoryPanelFormModalComponent);
    modalRef.componentInstance.currentRoom = this.currentRoom;
  }
  openArrangeCategoryPanel() {
    const modalRef = this.modalService.open(ArrangeCategoryFormModalComponent);
    modalRef.componentInstance.currentRoom = this.currentRoom;
  }
}
