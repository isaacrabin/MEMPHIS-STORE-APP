import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';
import { productModelServer } from 'src/app/models/product.model';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: any[] = [];

  constructor(
    private toast: ToastrService,
    private productService: ProductService,
    private cartService: CartService,
    private router:Router) { }

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
          this.toast.warning("Error occured");
         
          break;
      }
    });

  }

  selectProduct(id: any){
    this.router.navigate(['/product',id]).then()

  }

  addToCart(id: number){
    // this.toast.success('successfully added');
    this.cartService.addProductToCart(id);

  }

}
