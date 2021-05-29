import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Room } from 'src/app/models/room';
import { TransactionDetailDto } from 'src/app/models/transactionDetailDto';
import { CategoryService } from 'src/app/services/category.service';
import { RouterService } from 'src/app/services/router.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction-settings-modal',
  templateUrl: './transaction-settings-modal.component.html',
  styleUrls: ['./transaction-settings-modal.component.css'],
})
export class TransactionSettingsModalComponent implements OnInit {
  @Input() transaction: TransactionDetailDto;
  @Input() currentRoom: Room;
  categories: Category[];
  currentCategory: Category;
  clicked = false;
  transactionForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
    private toastrService: ToastrService,
    private routerService: RouterService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.createTransactionForm();
    this.getCategories();
  }
  getCategories() {
    this.categoryService.getCategories(this.currentRoom.id).subscribe(
      (response) => {
        this.categories = response.data;
      },
      (responseError) => {
        this.toastrService.error(responseError.error.message);
      }
    );
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
      categoryId: [this.transaction.categoryId, Validators.required],
    });
  }
  deleteTransaction() {
    let transaction = Object.assign({}, this.transactionForm.value, {
      id: this.transaction.transactionId,
      roomId: this.transaction.roomId,
      userId: this.transaction.userId,
      date: this.transaction.date,
    });
    this.transactionService.delete(transaction).subscribe(
      (response) => {
        this.clicked=true;
        this.toastrService.info(response.message);
        this.activeModal.dismiss();
        this.routerService.refreshPage();
      },
      (responseError) => {
        this.toastrService.error(responseError.error.message);
        this.clicked = false;
      }
    );
  }
  updateTransaction() {
    if (this.transactionForm.valid) {
      this.clicked = true;
      let transaction = Object.assign({}, this.transactionForm.value, {
        id: this.transaction.transactionId,
        roomId: this.transaction.roomId,
        userId: this.transaction.userId,
        date: this.transaction.date,
      });
      this.transactionService.update(transaction).subscribe(
        (response) => {
          this.toastrService.info(response.message);
          this.activeModal.dismiss();
          this.routerService.refreshPage();
        },
        (responseError) => {
          this.clicked = false;
          this.toastrService.error(responseError);
        }
      );
    }
  }
}
