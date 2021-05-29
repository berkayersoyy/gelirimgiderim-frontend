import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RoomService } from 'src/app/services/room.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-create-room-form-modal',
  templateUrl: './create-room-form-modal.component.html',
  styleUrls: ['./create-room-form-modal.component.css'],
})
export class CreateRoomFormModalComponent implements OnInit {
  roomForm: FormGroup;
  clicked = false;

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    private toastrService: ToastrService,
    private routerService: RouterService
  ) {}

  ngOnInit(): void {
    this.createRoomForm();
  }

  createRoomForm() {
    this.roomForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
    });
  }

  createRoom() {
    this.clicked = true;
    if (this.roomForm.valid) {
      let room = Object.assign({}, this.roomForm.value);
      this.roomService.add(room).subscribe(
        (response) => {
          this.toastrService.success(response.message);
          this.activeModal.dismiss();
          this.routerService.refreshPage();
        },
        (responseError) => {
          this.toastrService.error(responseError);
        }
      );
    } else {
      this.clicked=false;
      this.toastrService.error('Eksik bilgi girdiniz!');
    }
  }
}
