import { Component, OnInit } from '@angular/core';
import { Validators,FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Room } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-confirm-delete-room',
  templateUrl: './confirm-delete-room.component.html',
  styleUrls: ['./confirm-delete-room.component.css'],
})
export class ConfirmDeleteRoomComponent implements OnInit {
  clicked = false;
  room: Room;
  roomForm:FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private roomService: RoomService,
    private toastrService: ToastrService,
    private formBuilder:FormBuilder,
    private router:Router,
    private transactionService:TransactionService
  ) {}

  ngOnInit(): void {
    this.createRoomForm();
  }

  createRoomForm(){
    this.roomForm = this.formBuilder.group({
      roomName:["",Validators.required]
    });
  }

  deleteRoom() {
    if(this.roomForm.value.roomName!=this.room.name){
      this.toastrService.error("Hatalı ya da eksik bilgi girdiniz!");
      return;
    }
    this.clicked=true;
    this.roomService.delete(this.room).subscribe(response => {
      this.transactionService.getTransactions(this.room.id).subscribe(response=>{
        response.data.forEach(c=>this.transactionService.delete(c).subscribe(insideResponse=>{

        },errorResponse=>{
          this.toastrService.error(errorResponse);
        }))
      },errorResponse=>{
        this.toastrService.error(errorResponse);
      });
      this.toastrService.info("Oda silindi.")
      this.activeModal.dismiss();
      this.router.navigate(['/panel']);
    },responseError=>{
      this.toastrService.error(responseError);
      this.clicked=false;
    });
  }
}
