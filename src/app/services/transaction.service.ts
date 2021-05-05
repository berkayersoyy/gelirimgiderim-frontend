import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Room } from '../models/room';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  apiUrl="https://gelirimgiderim.azurewebsites.net/api/transactions/";

  constructor(private httpClient:HttpClient) { }

  getTransactionTest():Observable<ListResponseModel<Transaction>>{
    let newPath = this.apiUrl + "getall";
    return this.httpClient.get<ListResponseModel<Transaction>>(newPath);
  }
  getTransactions():Observable<ListResponseModel<Transaction>>{
    let newPath = this.apiUrl + "getallforroom";
    return this.httpClient.get<ListResponseModel<Transaction>>(newPath);
  }
  getTransactionById(id:string):Observable<SingleResponseModel<Transaction>>{
    let newPath=this.apiUrl + "getbyid?id="+id;
    return this.httpClient.get<SingleResponseModel<Transaction>>(newPath);
  }
  add(transaction:Transaction){
    let newPath = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(newPath,transaction);
  }
  update(transaction:Transaction){
    let newPath = this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(newPath,transaction);
  }
  delete(transaction:Transaction){
    let newPath = this.apiUrl + "delete";
    return this.httpClient.post<ResponseModel>(newPath,transaction);
  }
}
