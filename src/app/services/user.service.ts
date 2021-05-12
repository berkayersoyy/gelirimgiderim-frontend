import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  apiUrl = "https://localhost:44386/api/users/";

  getCurrentUser(): Observable<SingleResponseModel<User>>{
      let newPath = this.apiUrl + "currentuser";
      return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
  getUserById(id:string):Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl + "getbyid";
    const params = new HttpParams().set('id',id);
    return this.httpClient.get<SingleResponseModel<User>>(newPath,{params:params});
  }
  getUserByEmail(email:string):Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl + "getbyemail";
    const params = new HttpParams().set('email',email);
    return this.httpClient.get<SingleResponseModel<User>>(newPath,{params:params});
  }
}
