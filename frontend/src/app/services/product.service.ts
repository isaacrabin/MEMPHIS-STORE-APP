import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { Observable } from 'rxjs';
import { productModelServer } from '../models/product.model';

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

//GET A SINGLE PRODUCT FROM THE SERVER
singleProduct(id: number): Observable<productModelServer>{
  const params = { }
  return this.http.get<productModelServer>(
    `${this.SERVER_URL}products/` + id, { params }
  )

}

//GET PPRODUCT FROM ONE CATEGORY
getProductFromCategory(name: string): Observable<productModelServer>{
  const params = { }
  return this.http.get<productModelServer>(
    `${this.SERVER_URL}products/category` + name, { params }

  )
}


}
