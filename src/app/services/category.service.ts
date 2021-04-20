import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl="https://localhost:44381/api/categories/";

  constructor(private httpClient:HttpClient) { }

  getCategories():Observable<ListResponseModel<Category>>{
    let newPath = this.apiUrl + "getall";
    return this.httpClient.get<ListResponseModel<Category>>(newPath);
  }
  getCategoriesById(id:string):Observable<SingleResponseModel<Category>>{
    let newPath = this.apiUrl + "getbyid?id="+id;
    return this.httpClient.get<SingleResponseModel<Category>>(newPath);
  }
  add(transaction:Category){
    let newPath = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(newPath,transaction);
  }
  update(transaction:Category){
    let newPath = this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(newPath,transaction);
  }
  delete(transaction:Category){
    let newPath = this.apiUrl + "delete";
    return this.httpClient.post<ResponseModel>(newPath,transaction);
  }
  
}
