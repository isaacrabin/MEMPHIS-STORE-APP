import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  SERVER_URL = environment.serverURL;


  constructor(
    private http: HttpClient
  ) { }

//  getAllProducts(){
//    return this.http.get(this.SERVER_URL + 'products',{
     
    
//    })

//  }
getAllProducts(): Observable<any[]> {
  const params = { }
  return this.http.get<any[]>(
    `${this.SERVER_URL}products`, { params }
  );
}
}
