import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  apiUrl = 'https://localhost:44386/api/transactions/';

  constructor(private httpClient: HttpClient) {}

  getTransactions(room: string): Observable<ListResponseModel<Transaction>> {
    let newPath = this.apiUrl + 'getallforroom';
    const params = new HttpParams().set('room', room);
    return this.httpClient.get<ListResponseModel<Transaction>>(newPath, {
      params: params,
    });
  }
  getTransactionById(
    transaction: string
  ): Observable<SingleResponseModel<Transaction>> {
    let newPath = this.apiUrl + 'get';
    const params = new HttpParams().set('id', transaction);
    return this.httpClient.get<SingleResponseModel<Transaction>>(newPath, {
      params: params,
    });
  }
  add(transaction: Transaction) {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, transaction);
  }
  update(transaction: Transaction) {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(newPath, transaction);
  }
  delete(transaction: Transaction) {
    let newPath = this.apiUrl + 'delete';
    return this.httpClient.post<ResponseModel>(newPath, transaction);
  }
}
