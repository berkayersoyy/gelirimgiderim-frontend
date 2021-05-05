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

  apiUrl = "https://gelirimgiderim.azurewebsites.net/api/auth/";

  constructor(private httpClient:HttpClient) { }

  register(registerModel:RegisterModel){
    let newPath = this.apiUrl+"register";
    this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,registerModel);
  }
  login(loginModel:LoginModel){
    let newPath = this.apiUrl+"login";
    this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel);
  }
  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }
}
