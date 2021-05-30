import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { Room } from 'src/app/models/room';
import { User } from 'src/app/models/user';
import { RoomService } from 'src/app/services/room.service';
import { UserService } from 'src/app/services/user.service';
import { AddClaimFormModalComponent } from '../add-claim-form-modal/add-claim-form-modal.component';
import { ArrangeClaimsFormModalComponent } from '../arrange-claims-form-modal/arrange-claims-form-modal.component';
import { ArrangeUsersFormModalComponent } from '../arrange-users-form-modal/arrange-users-form-modal.component';
import { ChangeRoomForModalComponent } from '../change-room-for-modal/change-room-for-modal.component';
import { ConfirmDeleteRoomComponent } from '../confirm-delete-room/confirm-delete-room.component';
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
  currentUser :User;

  constructor(
    private roomService: RoomService,
    private modalService: NgbModal,
    private router: Router,
    private toastrService:ToastrService,
    private userService:UserService
  ) {}

  ngOnInit(): void {
    this.getRooms();
    this.getCurrentUser()
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
  openChangeRoomFormModal(){
    const modalRef = this.modalService.open(ChangeRoomForModalComponent);
    modalRef.componentInstance.room = this.currentRoom;
  }
  openDeleteRoomFormModal(){
    const modalRef = this.modalService.open(ConfirmDeleteRoomComponent);
    modalRef.componentInstance.room = this.currentRoom;
  }
  openArrangeUsersFormModal(){
    const modalRef = this.modalService.open(ArrangeUsersFormModalComponent);
    modalRef.componentInstance.currentRoom = this.currentRoom;
  }
  openAddClaimFormModal(){
    const modalRef = this.modalService.open(AddClaimFormModalComponent);
    modalRef.componentInstance.currentRoom = this.currentRoom;
  }
  openArrangeClaimsFormModal(){
    const modalRef = this.modalService.open(ArrangeClaimsFormModalComponent);
    modalRef.componentInstance.currentRoom = this.currentRoom
  }
  getCurrentRoomClass(room: Room) {
    if (room == this.currentRoom) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  getCurrentUser(){
    this.userService.getCurrentUser().subscribe(response=>{
      this.currentUser = response.data
      console.log
    })
  }
  leaveRoom(){
    this.roomService.leaveRoom(this.currentRoom).subscribe(response=>{
      this.toastrService.info(response.message)
      console.log(this.currentUser)
    })
  }
  setCurrentRoom(room: Room) {
    this.currentRoom = room;
    this.roomService.setCurrentRoom(room).subscribe(
      (response) => {},
      (responseError) => {
        this.toastrService.error(responseError);
      }
    );
  }
}
