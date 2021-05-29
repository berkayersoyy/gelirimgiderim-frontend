import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Room } from 'src/app/models/room';
import { User } from 'src/app/models/user';
import { RoomService } from 'src/app/services/room.service';
import { ChangeRoomForModalComponent } from '../change-room-for-modal/change-room-for-modal.component';
import { ConfirmDeleteRoomComponent } from '../confirm-delete-room/confirm-delete-room.component';

@Component({
  selector: 'app-room-settings',
  templateUrl: './room-settings.component.html',
  styleUrls: ['./room-settings.component.css'],
})
export class RoomSettingsComponent implements OnInit {
  currentRoomId: string;
  currentRoom: Room;
  users: User[] = [];
  dataLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
    this.currentRoomId = this.route.snapshot.paramMap.get('currentRoomId');
    this.getUsersInRoom();
    this.getRoom();
  }
  ngOnDestroy(): void {
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }
  getUsersInRoom() {
    this.roomService.getUsersExistInRoom(this.currentRoomId).subscribe(
      (response) => {
        this.users = response.data;
        this.dataLoaded = true;
      },
      (responseError) => {
        this.toastrService.error(responseError);
      }
    );
  }
  //TODO html arrangement need to be done so lame responsive design...
  getRoom() {
    this.roomService.get(this.currentRoomId).subscribe(
      (response) => {
        this.currentRoom = response.data;
      },
      (responseError) => {
        this.toastrService.error(responseError);
      }
    );
  }
  openDeleteRoomModal() {
    let modalRef = this.modalService.open(ConfirmDeleteRoomComponent);
    modalRef.componentInstance.room = this.currentRoom;
  }
  openUpdateRoomModal() {
    let modalRef = this.modalService.open(ChangeRoomForModalComponent);
    modalRef.componentInstance.room = this.currentRoom;
  }
}
