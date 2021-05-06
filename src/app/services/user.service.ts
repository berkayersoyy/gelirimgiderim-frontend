import { HttpClient } from '@angular/common/http';
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
      let newPath = this.apiUrl + "currentUser";
      return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
}
