import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Room } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';
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

  constructor(private roomService:RoomService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getRooms();
  }
 
  getRooms(){
    this.roomService.getRooms().subscribe(response=>{
      this.rooms=response.data;
      this.dataLoaded=true;
    },responseError=>{
      console.log(responseError.error.message)
    });
  }
  openCreateRoomFormModal() {
    const modalRef = this.modalService.open(CreateRoomFormModalComponent);
    
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }
  openJoinRoomFormModal() {
    const modalRef = this.modalService.open(JoinRoomFormModalComponent);
    
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

}
