import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SharedCategory } from '../models/sharedCategory';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl="https://gelirimgiderim.azurewebsites.net/api/categories/";

  constructor(private httpClient:HttpClient) { }

  getCategories(roomId:string):Observable<ListResponseModel<Category>>{
    let newPath = this.apiUrl + "getallforroom";
    const params = new HttpParams().set('roomId',roomId);
    return this.httpClient.get<ListResponseModel<Category>>(newPath,{params:params});
  }
  getCategoriesById(categoryId:string):Observable<SingleResponseModel<Category>>{
    let newPath = this.apiUrl + "getbyid";
    const params = new HttpParams().set('categoryId',categoryId);
    return this.httpClient.get<SingleResponseModel<Category>>(newPath,{params:params});
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
  getSharedCategories(){
    let newPath = this.apiUrl + "getsharedall";
    return this.httpClient.get<ListResponseModel<SharedCategory>>(newPath);
  }
  getSharedCategoryById(categoryId:string){
    let newPath = this.apiUrl + "getsharedbyid";
    const params = new HttpParams().set("categoryId",categoryId);
    return this.httpClient.get<SingleResponseModel<SharedCategory>>(newPath,{params:params});
  }
  
}
