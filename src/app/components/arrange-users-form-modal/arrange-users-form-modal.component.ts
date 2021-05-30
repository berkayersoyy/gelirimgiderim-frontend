import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Room } from 'src/app/models/room';
import { User } from 'src/app/models/user';
import { ClaimService } from 'src/app/services/claim.service';
import { RoomService } from 'src/app/services/room.service';
import { UserService } from 'src/app/services/user.service';
import { ArrangeClaimsForUserFormModalComponent } from '../arrange-claims-for-user-form-modal/arrange-claims-for-user-form-modal.component';

@Component({
  selector: 'app-arrange-users-form-modal',
  templateUrl: './arrange-users-form-modal.component.html',
  styleUrls: ['./arrange-users-form-modal.component.css'],
})
export class ArrangeUsersFormModalComponent implements OnInit {
  @Input() currentRoom: Room;
  users: User[] = [];
  selectedUser: User;
  currentClaim: any;
  currentUser: User;

  constructor(
    private roomService: RoomService,
    private toastrService: ToastrService,
    public activeModal: NgbActiveModal,
    private claimService: ClaimService,
    private modalService: NgbModal,
    private userService: UserService
  ) {}

  async ngOnInit() {
    await this.getCurrentUser()
    this.getUsers();
  }
  openArrangeUserClaimFormModal() {
    if (this.selectedUser != null) {
      const modalRef = this.modalService.open(
        ArrangeClaimsForUserFormModalComponent
      );
      modalRef.componentInstance.currentRoom = this.currentRoom;
    } else {
      this.toastrService.error('Önce bir kullanıcı seçin!');
    }
  }
  async getCurrentUser() {
    this.currentUser = await (await this.userService.getCurrentUser().toPromise()).data;
  }
  getUsers() {
    this.roomService
      .getUsersExistInRoom(this.currentRoom.id)
      .subscribe((response) => {
        this.users = response.data;
      });
  }
  getCurrentUserClass(user: User) {
    if (user == this.selectedUser) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  setCurrentUser(user: User) {
    this.selectedUser = user;
  }
  leaveRoom() {
    if (this.selectedUser != null) {
      this.roomService
        .leaveUserFromRoom(this.selectedUser)
        .subscribe((response) => {
          this.toastrService.info(response.message);
        });
    } else {
      this.toastrService.error('Önce bir kullanıcı seçin!');
    }
  }
}
