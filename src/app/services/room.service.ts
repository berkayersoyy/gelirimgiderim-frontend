import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Room } from '../models/room';

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
  /*getUsersExistInRoom():Observable<ListResponseModel<ListResponseModel<>>{
    let newPath = this.apiUrl + "getusersexist";
    return this.httpClient.get<ListResponseModel<>>(newPath);
  }*/
}
