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

  apiUrl="https://localhost:44386/api/categories/";

  constructor(private httpClient:HttpClient) { }

  getCategories():Observable<ListResponseModel<Category>>{
    let newPath = this.apiUrl + "getall";
    return this.httpClient.get<ListResponseModel<Category>>(newPath);
  }
  getCategoriesById(category:Category):Observable<SingleResponseModel<Category>>{
    let newPath = this.apiUrl + "getbyid?id="+category;
    return this.httpClient.get<SingleResponseModel<Category>>(newPath);
  }
  add(category:Category){
    let newPath = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(newPath,category);
  }
  update(category:Category){
    let newPath = this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(newPath,category);
  }
  delete(category:Category){
    let newPath = this.apiUrl + "delete";
    return this.httpClient.post<ResponseModel>(newPath,category);
  }
  
}
