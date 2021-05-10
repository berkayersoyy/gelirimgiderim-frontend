import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invitation } from '../models/invitation';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Room } from '../models/room';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  apiUrl = "https://localhost:44386/api/rooms/";

  constructor(private httpClient:HttpClient) { }

  getRooms():Observable<ListResponseModel<Room>>{
    let newPath = this.apiUrl + "getall";
    return this.httpClient.get<ListResponseModel<Room>>(newPath);
  };
  getUsersExistInRoom(room:Room){
    let newPath= this.apiUrl + "getusersexist?room="+room;
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }
  get(room:string){
    let newPath = this.apiUrl+"get?room="+room;
    return this.httpClient.get<SingleResponseModel<Room>>(newPath);
  }
  add(room:Room){
    let newPath = this.apiUrl+"add";
    return this.httpClient.post<ResponseModel>(newPath,room);
  }
  update(room:Room){
    let newPath = this.apiUrl+"update";
    return this.httpClient.post<ResponseModel>(newPath,room);
  }
  delete(room:Room){
    let newPath = this.apiUrl+"delete";
    return this.httpClient.post<ResponseModel>(newPath,room);
  }
  deleteInvitation(invitation:Invitation){
    let newPath = this.apiUrl+"deleteinvitation";
    return this.httpClient.post<ResponseModel>(newPath,invitation);
  }
  createInvitation(room:Room){
    let newPath = this.apiUrl + "createinvitation";
    return this.httpClient.post<ResponseModel>(newPath,room);
  }
  getInvitation(room:Room){
    let newPath = this.apiUrl+"getinvitation?room="+room;
    return this.httpClient.get<SingleResponseModel<Invitation>>(newPath);
  }
  joinRoom(invitation:Invitation){
    let newPath = this.apiUrl+ "joinroom";
    return this.httpClient.post<ResponseModel>(newPath,invitation);
  }
  leaveRoom(room:Room){
    let newPath = this.apiUrl+"leaveroom";
    return this.httpClient.post<ResponseModel>(newPath,room);
  }
  
}
