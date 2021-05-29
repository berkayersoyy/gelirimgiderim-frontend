import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Room } from 'src/app/models/room';
import { CategoryService } from 'src/app/services/category.service';
import { RouterService } from 'src/app/services/router.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-add-transaction-form-modal',
  templateUrl: './add-transaction-form-modal.component.html',
  styleUrls: ['./add-transaction-form-modal.component.css'],
})
export class AddTransactionFormModalComponent implements OnInit {
  transactionForm: FormGroup;
  categories: Category[];
  currentCategory: Category;
  clicked = false;
  @Input() currentRoom: Room;
  constructor(
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
    public activeModal: NgbActiveModal,
    private categoryService: CategoryService,
    private routerService:RouterService
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
      description: ['', [Validators.required, Validators.maxLength(150)]],
      title: ['', [Validators.required, Validators.maxLength(50)]],
      amount: ['', Validators.required],
      categoryId:['',Validators.required]
    });
  }
  addTransaction() {
    if (this.transactionForm.valid) {
      this.clicked = true;
      let transaction = Object.assign({}, this.transactionForm.value, {
        roomId: this.currentRoom.id,
      });
      this.transactionService.add(transaction).subscribe(
        (response) => {
          this.toastrService.success(response.message);
          this.activeModal.dismiss();
          this.routerService.refreshPage();
        },
        (responseError) => {
          this.clicked = false;
          this.toastrService.error(responseError);
        }
      );
    }else{
      this.toastrService.error("Hatalı ya da eksik bilgi girdiniz!");
    }
  }
}
