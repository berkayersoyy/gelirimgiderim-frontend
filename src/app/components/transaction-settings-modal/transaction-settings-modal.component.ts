import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Transaction } from 'src/app/models/transaction';
import { TransactionDetailDto } from 'src/app/models/transactionDetailDto';
import { RouterService } from 'src/app/services/router.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction-settings-modal',
  templateUrl: './transaction-settings-modal.component.html',
  styleUrls: ['./transaction-settings-modal.component.css'],
})
export class TransactionSettingsModalComponent implements OnInit {
  @Input() transaction: TransactionDetailDto;

  clicked = false;
  transactionForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
    private toastrService: ToastrService,
    private routerService: RouterService
  ) {}

  ngOnInit(): void {
    this.createTransactionForm();
  }

  createTransactionForm() {
    this.transactionForm = this.formBuilder.group({
      description: [
        this.transaction.description,
        [Validators.required, Validators.maxLength(150)],
      ],
      title: [
        this.transaction.title,
        [Validators.required, Validators.maxLength(50)],
      ],
      amount: [this.transaction.amount.toString(), Validators.required],
    });
  }
  deleteTransaction() {
    this.transactionService.getTransactionById(this.transaction.transactionId).subscribe(response=>{
      this.transactionService.delete(response.data).subscribe(
        (response) => {
          this.clicked=true;
          this.toastrService.info(response.message);
          this.activeModal.dismiss();
          this.routerService.refreshPage();
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message);
          this.clicked=false;
        }
      );
    },errorResponse=>{
      this.toastrService.error(errorResponse.error.message);
    })
  
  }
  updateTransaction() {
    if (this.transactionForm.valid) {
      this.clicked=true;
      let transaction = Object.assign({}, this.transactionForm.value, {
        id: this.transaction.transactionId,
        roomId : this.transaction.roomId,
        userId : this.transaction.userId,
        date:this.transaction.date
      });
      this.transactionService.update(transaction).subscribe(
        (response) => {
          this.toastrService.info(response.message);
          this.activeModal.dismiss();
          this.routerService.refreshPage();
        },
        (responseError) => {
          this.clicked=false;
          this.toastrService.error(responseError.error.message);
        }
      );
    }
  }
}
