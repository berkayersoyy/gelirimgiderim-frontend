import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Room } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-change-room-for-modal',
  templateUrl: './change-room-for-modal.component.html',
  styleUrls: ['./change-room-for-modal.component.css'],
})
export class ChangeRoomForModalComponent implements OnInit {
  clicked = false;
  roomForm: FormGroup;
  @Input() room:Room;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.createRoomForm();
  }

  createRoomForm(){
    this.roomForm = this.formBuilder.group({
      name:[this.room.name,Validators.required],
      description:[this.room.description]
    });
  }
  updateRoom(){
    if(this.roomForm.valid){
      this.clicked=true;
      let room = Object.assign({},this.roomForm.value,{id:this.room.id});
      this.roomService.update(room).subscribe(response=>{
        this.toastrService.success(response.message)
        this.activeModal.dismiss();
        this.room=room;
      },responseError=>{
        this.clicked=false;
        this.toastrService.error(responseError);
      });
    }
  }
}
