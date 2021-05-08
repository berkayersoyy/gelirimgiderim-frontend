import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RoomService } from 'src/app/services/room.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-join-room-form-modal',
  templateUrl: './join-room-form-modal.component.html',
  styleUrls: ['./join-room-form-modal.component.css'],
})
export class JoinRoomFormModalComponent implements OnInit {
  roomForm: FormGroup;
  clicked=false;
  constructor(
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    private routerService: RouterService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.createRoomForm();
  }

  createRoomForm(){
    this.roomForm = this.formBuilder.group({
      invitation:["",Validators.required]
    })
  }
  joinRoom(){
    if(this.roomForm.valid){
      let invitation = Object.assign({},this.roomForm.value);
      this.roomService.joinRoom(invitation).subscribe(response=>{
        this.toastrService.success(response.message);
        this.activeModal.dismiss();
        this.routerService.refreshPage();
      },errorResponse=>{
        this.toastrService.error(errorResponse.error.message);
      });
    }
  }
}
