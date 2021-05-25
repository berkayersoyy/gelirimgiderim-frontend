import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-add-transaction-form-modal',
  templateUrl: './add-transaction-form-modal.component.html',
  styleUrls: ['./add-transaction-form-modal.component.css'],
})
export class AddTransactionFormModalComponent implements OnInit {
  transactionForm: FormGroup;
  clicked=false;
  constructor(
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.createTransactionForm();
  }

  createTransactionForm() {
    this.transactionForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.maxLength(150)]],
      title: ['', [Validators.required, Validators.maxLength(50)]],
      amount: ['', Validators.required],
    });
  }
  addTransaction(){
    if(this.transactionForm.valid){
      this.clicked=true;
      let transaction = Object.assign({},this.transactionForm.value);
      this.transactionService.add(transaction).subscribe(response=>{
        this.toastrService.success(response.message);
        this.activeModal.dismiss()
      },responseError=>{
        this.clicked=false;
        this.toastrService.error(responseError.error.message);
      })
    }
  }
}
