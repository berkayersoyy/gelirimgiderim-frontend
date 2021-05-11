import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Room } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';
import { CreateInvitationFormModalComponent } from '../create-invitation-form-modal/create-invitation-form-modal.component';
import { CreateRoomFormModalComponent } from '../create-room-form-modal/create-room-form-modal.component';
import { JoinRoomFormModalComponent } from '../join-room-form-modal/join-room-form-modal.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  dataLoaded=false;
  rooms:Room[];
  @Input() currentRoom:Room;

  constructor(private roomService:RoomService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getRooms();
  }
  //TODO settings need to be dropdown menu and arranged
  //TODO  davet olustur button need to be used as modal
  getRooms(){
    this.roomService.getRooms().subscribe(response=>{
      this.rooms=response.data;
      this.dataLoaded=true;
    },responseError=>{
      console.log(responseError.error.message)
    });
  }
  //TODO room name pipe need to be added 11 word + ... 
  //TODO room badge for users in room
  openCreateRoomFormModal() {
    const modalRef = this.modalService.open(CreateRoomFormModalComponent);
  }
  openJoinRoomFormModal() {
    const modalRef = this.modalService.open(JoinRoomFormModalComponent);
  }
  openCreateInvitationFormModal(){
    const modalRef = this.modalService.open(CreateInvitationFormModalComponent)
    modalRef.componentInstance.room = this.currentRoom;
  
  }
  getCurrentRoomClass(room:Room){
    if(room==this.currentRoom){
      return "list-group-item active";
    } else{
      return "list-group-item";
    }
  }
  setCurrentRoom(room:Room){
    this.currentRoom=room;
  }

}
