import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44386/api/auth/";

  constructor(private httpClient:HttpClient) { }

  register(registerModel:RegisterModel){
    let newPath = this.apiUrl+"register";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,registerModel);
  }
  login(loginModel:LoginModel){
    let newPath = this.apiUrl+"login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel);
  }
  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }
}
