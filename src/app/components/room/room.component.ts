import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  dataLoaded=false;
  rooms:Room[];

  constructor(private roomService:RoomService) { }

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

}
