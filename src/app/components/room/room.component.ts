import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { Room } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { CreateInvitationFormModalComponent } from '../create-invitation-form-modal/create-invitation-form-modal.component';
import { CreateRoomFormModalComponent } from '../create-room-form-modal/create-room-form-modal.component';
import { JoinRoomFormModalComponent } from '../join-room-form-modal/join-room-form-modal.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  dataLoaded = false;
  rooms: Room[];
  @Input() currentRoom: Room;

  constructor(
    private roomService: RoomService,
    private modalService: NgbModal,
    private router: Router,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.getRooms();
  }
  getRooms() {
    this.roomService.getRooms().subscribe(
      (response) => {
        this.rooms = response.data;
        this.dataLoaded = true;
      },
      (responseError) => {
        console.log(responseError);
      }
    );
  }
  //TODO room name pipe need to be added 11 word + ...
  //TODO room badge for users in room
  openCreateRoomFormModal() {
    const modalRef = this.modalService.open(CreateRoomFormModalComponent);
  }
  openJoinRoomFormModal() {
    const modalRef = this.modalService.open(JoinRoomFormModalComponent);
  }
  openCreateInvitationFormModal() {
    const modalRef = this.modalService.open(CreateInvitationFormModalComponent);
    modalRef.componentInstance.room = this.currentRoom;
  }
  getCurrentRoomClass(room: Room) {
    if (room == this.currentRoom) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  setCurrentRoom(room: Room) {
    this.currentRoom = room;
    this.roomService.setCurrentRoom(room).subscribe(
      (response) => {},
      (errorResponse) => {
        this.toastrService.error(errorResponse.error.message);
      }
    );
  }
  routeToRoomSettings() {
    this.router.navigate([
      '/panel/roomsettings',
      { currentRoomId: this.currentRoom.id },
    ]);
  }
}
