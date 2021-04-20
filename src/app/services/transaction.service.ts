import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  apiUrl="https://localhost:44381/api/transactions/";

  constructor(private httpClient:HttpClient) { }

  getTransactions():Observable<ListResponseModel<Transaction>>{
    let newPath = this.apiUrl + "getall";
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
