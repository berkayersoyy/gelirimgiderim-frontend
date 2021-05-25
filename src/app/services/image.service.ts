import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient:HttpClient) { }

  loadImage(url:string):Observable<Blob>{
    return this.httpClient.get(url,{responseType:'blob'});
  }
}
