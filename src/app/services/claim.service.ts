import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Claim } from '../models/claim';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SharedClaim } from '../models/sharedClaim';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserClaim } from '../models/userClaim';

@Injectable({
  providedIn: 'root',
})
export class ClaimService {
  apiUrl = 'https://gelirimgiderim.azurewebsites.net/api/claims/';

  constructor(private httpClient: HttpClient) {}

  getClaims(room: string): Observable<ListResponseModel<Claim>> {
    let newPath = this.apiUrl + 'getall';
    const params = new HttpParams().set('room', room);
    return this.httpClient.get<ListResponseModel<Claim>>(newPath, {
      params: params,
    });
  }
  getClaim(claim: string): Observable<SingleResponseModel<Claim>> {
    let newPath = this.apiUrl + 'get';
    const params = new HttpParams().set('room', claim);
    return this.httpClient.get<SingleResponseModel<Claim>>(newPath, {
      params: params,
    });
  }
  add(claim: Claim) {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, claim);
  }
  delete(claim: Claim) {
    let newPath = this.apiUrl + 'delete';
    return this.httpClient.post<ResponseModel>(newPath, claim);
  }
  update(claim: Claim) {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(newPath, claim);
  }
  getUserClaims(room: string): Observable<ListResponseModel<Claim>> {
    let newPath = this.apiUrl + 'getuserclaims';
    const params = new HttpParams().set('room', room);
    return this.httpClient.get<ListResponseModel<Claim>>(newPath, {
      params: params,
    });
  }
  addClaimToUser(userClaim: UserClaim) {
    let newPath = this.apiUrl + 'addclaimtouser';
    return this.httpClient.post<ResponseModel>(newPath, userClaim);
  }
  deleteClaimFromUser(userClaim: UserClaim) {
    let newPath = this.apiUrl + 'deleteclaimfromuser';
    return this.httpClient.post<ResponseModel>(newPath, userClaim);
  }
  getSharedClaims() {
    let newPath = this.apiUrl + 'getsharedall';
    return this.httpClient.get<ListResponseModel<SharedClaim>>(newPath);
  }
  getSharedClaim(claimId: string) {
    let newPath = this.apiUrl + 'getshared';
    const params = new HttpParams().set('claimId', claimId);
    return this.httpClient.get<SingleResponseModel<SharedClaim>>(newPath, {
      params: params,
    });
  }
  getUserSharedClaims(roomId: string) {
    let newPath = this.apiUrl + 'getusersharedclaims';
    const params = new HttpParams().set('roomId', roomId);
    return this.httpClient.get<ListResponseModel<SharedClaim>>(newPath, {
      params: params,
    });
  }
  updateClaimToUser(userClaim:UserClaim){
    let newPath = this.apiUrl+'updateclaimtouser';
    return this.httpClient.post<ResponseModel>(newPath,userClaim);
  }
}
