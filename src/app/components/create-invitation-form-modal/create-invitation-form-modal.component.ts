import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Invitation } from 'src/app/models/invitation';
import { Room } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-create-invitation-form-modal',
  templateUrl: './create-invitation-form-modal.component.html',
  styleUrls: ['./create-invitation-form-modal.component.css'],
})
export class CreateInvitationFormModalComponent implements OnInit {
  invitation: Invitation;
  room:Room;
  dataLoaded=false;

  constructor(
    private roomService: RoomService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.getInvitation();
  }
  //TODO subscribe invitation expire date for check everytime.
  createInvitation() {
    this.roomService.createInvitation(this.room).subscribe(response=>{
        this.invitation = response.data;
        this.toastrService.success(response.message)
        this.dataLoaded=true;
    },responseError=>{
      this.toastrService.error(responseError.error.message)
    });
  }
  deleteInvitation(){
    this.roomService.deleteInvitation(this.invitation).subscribe(response=>{
      this.toastrService.info(response.message)
      this.activeModal.dismiss();
    },responseError=>{
      this.toastrService.error(responseError.error.message)
    });
  }
  getInvitation(){
    this.roomService.getInvitation(this.room.id).subscribe(response=>{
      this.invitation=response.data
      this.dataLoaded=true;
    },responseError=>{
      this.toastrService.error(responseError.error.message)
    });
  }
}
