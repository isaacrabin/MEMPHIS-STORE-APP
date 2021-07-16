import { Component, OnInit } from '@angular/core';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
    
   
  }
  // getAllProducts(){
  //   this.productService.getAllProducts().subscribe(prods =>{
  //     console.log(prods);
  //   })
  getAllProducts(){
    this.productService
    .getAllProducts()
    .subscribe((resp: any) => {
      switch (resp.responseCode) {
        case "00":
          
        this.products = resp.products;
        console.log(this.products)
          break;
        case "01":
         
          break;
      }
    });

  }

}
