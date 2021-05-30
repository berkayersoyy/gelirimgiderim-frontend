import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invitation } from '../models/invitation';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Room } from '../models/room';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  apiUrl = 'https://gelirimgiderim.azurewebsites.net/api/rooms/';

  constructor(private httpClient: HttpClient) {}

  getRooms(): Observable<ListResponseModel<Room>> {
    let newPath = this.apiUrl + 'getuserrooms';
    return this.httpClient.get<ListResponseModel<Room>>(newPath);
  }
  getUsersExistInRoom(room: string) {
    let newPath = this.apiUrl + 'getusersexist';
    const params = new HttpParams().set('room',room);
    return this.httpClient.get<ListResponseModel<User>>(newPath,{params:params});
  }
  get(room: string) {
    let newPath = this.apiUrl + 'get';
    const params = new HttpParams().set('room',room);
    return this.httpClient.get<SingleResponseModel<Room>>(newPath,{params:params});
  }
  add(room: Room) {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, room);
  }
  update(room: Room) {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(newPath, room);
  }
  delete(room: Room) {
    let newPath = this.apiUrl + 'delete';
    return this.httpClient.post<ResponseModel>(newPath, room);
  }
  deleteInvitation(invitation: Invitation) {
    let newPath = this.apiUrl + 'deleteinvitation';
    return this.httpClient.post<ResponseModel>(newPath, invitation);
  }
  createInvitation(room: Room): Observable<SingleResponseModel<Invitation>> {
    let newPath = this.apiUrl + 'createinvitation';
    return this.httpClient.post<SingleResponseModel<Invitation>>(newPath, room);
  }
  getInvitation(room: string) {
    let newPath = this.apiUrl + 'getinvitation';
    const params = new HttpParams().set('room', room);
    return this.httpClient.get<SingleResponseModel<Invitation>>(newPath, {
      params: params,
    });
  }
  joinRoom(invitation: Invitation) {
    let newPath = this.apiUrl + 'joinroom';
    return this.httpClient.post<ResponseModel>(newPath, invitation);
  }
  leaveRoom(room: Room) {
    let newPath = this.apiUrl + 'leaveroom';
    return this.httpClient.post<ResponseModel>(newPath, room);
  }
  setCurrentRoom(room:Room){
    let newPath = this.apiUrl+"setcurrentroom";
    return this.httpClient.post<ResponseModel>(newPath,room);
  }
  getCurrentRoom(){
    let newPath = this.apiUrl +"getcurrentroom";
    return this.httpClient.get<SingleResponseModel<Room>>(newPath);
  }
  leaveUserFromRoom(user:User){
    let newPath = this.apiUrl+'leaveuserfromroom';
    return this.httpClient.post<ResponseModel>(newPath,user);
  }
}
