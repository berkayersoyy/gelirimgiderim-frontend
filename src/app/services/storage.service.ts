import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { StorageModel } from '../models/storageModel';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private httpClient: HttpClient) {}
  apiUrl = 'https://localhost:44386/api/storage/';

  upload(path: StorageModel) {
    let newPath = this.apiUrl + 'upload';
    return this.httpClient.post<ListResponseModel<Array<string>>>(newPath,path);
  }
  delete(fileName: string) {
    let newPath = this.apiUrl + 'delete';
    return this.httpClient.post<ResponseModel>(newPath, fileName);
  }
  get(fileName: string) {
    let newPath = this.apiUrl + 'get';
    const params = new HttpParams().set('fileName', fileName);
    return this.httpClient.get<SingleResponseModel<string>>(newPath, {
      params: params,
    });
  }
}
