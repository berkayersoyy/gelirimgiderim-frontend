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

  apiUrl = "https://gelirimgiderim.azurewebsites.net/api/rooms/";

  constructor(private httpClient:HttpClient) { }

  getRooms():Observable<ListResponseModel<Room>>{
    let newPath = this.apiUrl + "getall";
    return this.httpClient.get<ListResponseModel<Room>>(newPath);
  };
  getUsersExistInRoom(room:Room){
    let newPath= this.apiUrl + "getusersexist?room="+room;
    return this.httpClient.get<ListResponseModel<User>>(newPath);
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
  joinRoom(invitationCode:string){
    let newPath = this.apiUrl+"joinroom";
    return this.httpClient.post<ResponseModel>(newPath,invitationCode);
  }
  leaveRoom(room:Room){
    let newPath = this.apiUrl+"leaveroom";
    return this.httpClient.post<ResponseModel>(newPath,room);
  }
  
}
