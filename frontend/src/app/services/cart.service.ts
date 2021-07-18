// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { environment } from 'src/environments/environment';
// import { CartModelPublic, CartModelServer} from '../models/cart.model';
// import {productModelServer} from '../models/product.model';
// import { OrderService } from './order.service';
// import { ProductService } from './product.service';
// import {ToastrService} from 'ngx-toastr';
// import {NgxSpinnerService} from "ngx-spinner";
// import {NavigationExtras, Router} from "@angular/router";
// import { ThrowStmt } from '@angular/compiler';

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {

//   ServerURL = environment.serverURL;

//   //Variable for storing the client cart information in the local storage


//    cartDataClient: CartModelPublic = {prodData: [{incart: 0, id: 0}], total: 0};  
//   // Cart Data variable to store the cart information on the server
//    cartDataServer: any = {
//     data: [{  
//       product:undefined,    
//       numInCart: 0,
      
//     }],
//     total: 0
//   };
//   $countrySubject = new BehaviorSubject<any>(true);

  
//   cartTotal$ = new BehaviorSubject<any>(0);

//   cartDataObs$ = new BehaviorSubject<any>(this.cartDataServer);

//   constructor(
//     private http: HttpClient,
//     private productService: ProductService,
//     private oderService: OrderService,   
//     private orderService: OrderService,
//     private router: Router,
//     private spinner: NgxSpinnerService,
//     private toast: ToastrService
//   ) {

//     this.cartTotal$.next(this.cartDataServer.total);
//     this.cartDataObs$.next(this.cartDataServer);   

//     let info: CartModelPublic = JSON.parse(localStorage.getItem('cart') || '{}' as 'cart');

//     console.log(info)
   

//     if (info !== null && info !== undefined && info.prodData[0].incart !== 0) {
//       // assign the value to our data variable which corresponds to the LocalStorage data format
//       this.cartDataClient = info;
//       // Loop through each entry and put it in the cartDataServer object
//       this.cartDataClient.prodData.forEach(p => {
//         this.productService.singleProduct(p.id).subscribe((actualProdInfo: productModelServer) => {
//           if (this.cartDataServer.data[0].numInCart === 0) {
//             this.cartDataServer.data[0].numInCart = p.incart;
//             this.cartDataServer.data[0].product = actualProdInfo;
//             //this.CalculateTotal();
//             this.cartDataClient.total = this.cartDataServer.total;
//             localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
//           } else {
//             this.cartDataServer.data.push({
//               numInCart: p.incart,
//               product: actualProdInfo
//             });
//             //this.CalculateTotal();
//             this.cartDataClient.total = this.cartDataServer.total;
//             localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
//           }
//           this.cartDataObs$.next({...this.cartDataServer});
//         });
//       });
//     }
//    }

//    // Adding product to cart
//    addProductToCart(id: number, quantity?: number){ 

    

//     this.productService.singleProduct(id).subscribe(prod =>{
      
//        //if the cart is empty
//       if(this.cartDataServer.data[0].product ==undefined){
//         this.cartDataServer.data[0].product = prod;
//         this.cartDataServer.data[0].numInCart = quantity !== undefined ? quantity : 1

//         //TOTAL amount
//         if (this.cartDataServer.data[0].product === undefined) {
//           this.cartDataServer.data[0].product = prod;
//           this.cartDataServer.data[0].numInCart = quantity !== undefined ? quantity : 1;
//           this.calculateTotal();
//           this.cartDataClient.prodData[0].incart = this.cartDataServer.data[0].numInCart;
//           this.cartDataClient.prodData[0].id = prod.id;
//           this.cartDataClient.total = this.cartDataServer.total;
//           localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
//         this.cartDataObs$.next({... this.cartDataServer});

//         this.toast.success(`${prod.name} added to the cart.`, "Product Added", {
//           timeOut: 1500,
//           progressBar: true,
//           progressAnimation: 'increasing',
//           positionClass: 'toast-top-right'
//         })
//       }

//          //cart has some items

//          let index = this.cartDataServer.data.findIndex((p: any) => p.product.id == prod.id);
//            //item your are adding is already in the cart
//            if(index !== -1){
//              if(quantity !== undefined && quantity <= prod.quantity){
//                this.cartDataServer.data[index].numInCart = this.cartDataServer.data[index].numInCart < prod.quantity ? quantity: prod.quantity;
//               }
//               else{

//                this.cartDataServer.data[index].numInCart = this.cartDataServer.data[index].numInCart < prod.quantity ? this.cartDataServer.data[index].numInCart++ : prod.quantity;

//               }
//               this.cartDataClient.prodData[index].incart = this.cartDataServer.data[index].numInCart;
//               this.calculateTotal();
//               this.cartDataClient.total = this.cartDataServer.total;
//               localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
//               this.toast.info(`${prod.name} quantity updated in the cart.`, "Product Updated", {
//                 timeOut: 1500,
//                 progressBar: true,
//                 progressAnimation: 'increasing',
//                 positionClass: 'toast-top-right'
//               })

//            }
//            else{
//               //item is not in the cart
//               this.cartDataServer.data.push({
//                 numInCart: 1,
//                 product: prod
//               });
              
//               this.cartDataClient.prodData.push({
//                 incart:1,
//                 id: prod.id
//               });
//               localStorage.setItem('cart', JSON.stringify(this.cartDataClient));

//               this.toast.success(`${prod.name} added to the cart.`, "Product Added", {
//                 timeOut: 1500,
//                 progressBar: true,
//                 progressAnimation: 'increasing',
//                 positionClass: 'toast-top-right'
//               })
//               this.calculateTotal();
//               this.cartDataClient.total = this.cartDataServer.total;
//               localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
//               this.cartDataObs$.next({... this.cartDataServer});
//            }
//           }});



//    }

//    updateCartItem(index: number,increase: boolean){
//      let data = this.cartDataServer.data[index];

//      if(increase){
//        data.numInCart < data.product.quantity ? data.numInCart++ : data.product.quantity;
//        this.cartDataClient.prodData[index].incart = data.numInCart;

//        this.cartDataClient.total = this.cartDataServer.total;
//        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
//        this.cartDataObs$.next({... this.cartDataServer});
//      }
//      else{
//        data.numInCart--;

//        if (data.numInCart < 1) {
//              // this.DeleteProductFromCart(index);
//               this.cartDataObs$.next({...this.cartDataServer});
//             } else {
//               // @ts-ignore
//               this.cartDataObs$.next({...this.cartDataServer});
//               this.cartDataClient.prodData[index].incart = data.numInCart;
//               this.calculateTotal();              
//               localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
//      }

//    }    

//   }

//   deleteProductFromCart(index:  number){
//     if(window.confirm('Are you sure you want remove the item?')){
//       this.cartDataServer.data.splice(index, 1);
//       this.cartDataClient.prodData.splice(index,1);

//       this.cartDataClient.total = this.cartDataServer.total;

//       if(this.cartDataClient.total){
//         this.cartDataClient = {prodData: [{incart: 0, id: 0}], total: 0};
//         localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
//       }
//       else{
//         localStorage.setItem('cart', JSON.stringify(this.cartDataClient));

//       }
      
//       if(this.cartDataServer.total == 0){
//         this.cartDataServer = {
//           data: [{
//             product: undefined,
//             numInCart: 0
//           }],
//           total: 0
//         };
//         this.cartDataObs$.next({...this.cartDataServer});
//       }
//       else{
//         this.cartDataObs$.next({...this.cartDataServer});
//       }

//     }
//     else{
//       return;
//     }

//   }

//    public calculateTotal() {
//     let Total = 0;

//     this.cartDataServer.data.forEach((p: any) => {
//       const {numInCart} = p;
//       const {price} = p.product;
//       // @ts-ignore
//       Total += numInCart * price;
//     });
//     this.cartDataServer.total = Total;
//     this.cartTotal$.next(this.cartDataServer.total);
//   }

//   calculateSubTotal(index : number){
//     let subTotal = 0;

//     let p = this.cartDataServer.data[index];
//     // @ts-ignore
//     subTotal = p.product.price * p.numInCart;

//     return subTotal;
//   }

//   CheckoutFromCart(userId: Number) {
//     const payload = { }

//     this.http.post<any>(`${this.ServerURL}orders/payment`, payload).subscribe((res: { success: Boolean }) => {
//       console.clear();

//       if (res.success) {
//         //this.resetServerData();
//         this.http.post<any>(`${this.ServerURL}orders/new`, {
//           userId: userId,
//           products: this.cartDataClient.prodData
//         }).subscribe((data: OrderConfirmationResponse) => {

//           this.orderService.getSingleOrder(data.order_id).then(prods => {
//             if (data.success) {
//               const navigationExtras: NavigationExtras = {
//                 state: {
//                   message: data.message,
//                   products: prods,
//                   orderId: data.order_id,
//                   total: this.cartDataClient.total
//                 }
//               };
//               this.spinner.hide().then();
//               this.router.navigate(['/thanks'], navigationExtras).then(p => {
//                 this.cartDataClient = {prodData: [{incart: 0, id: 0}], total: 0};
//                 this.cartTotal$.next(0);
//                 localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
//               });
//             }
//           });

//         })
//       } else {
//         this.spinner.hide().then();
//         this.router.navigateByUrl('/checkout').then();
//         this.toast.error(`Sorry, failed to book the order`, "Order Status", {
//           timeOut: 1500,
//           progressBar: true,
//           progressAnimation: 'increasing',
//           positionClass: 'toast-top-right'
//         })
//       }
//     })
//   }

//   private resetServerData() {
//     this.cartDataServer = {
//       data: [{
//         product: undefined,
//         numInCart: 0
//       }],
//       total: 0
//     };
//     this.cartDataObs$.next({...this.cartDataServer});
//   }

 
// }


// interface OrderConfirmationResponse {
//   order_id: Number;
//   success: Boolean;
//   message: String;
//   products: [{
//     id: String,
//     numInCart: String
//   }]
// }

import {Injectable} from '@angular/core';
import {ProductService} from "./product.service";
import {BehaviorSubject} from "rxjs";
import {CartModelPublic, CartModelServer} from "../models/cart.model";
import {productModelServer} from "../models/product.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {NavigationExtras, Router} from "@angular/router";
import {OrderService} from "./order.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})


export class CartService {

  ServerURL = environment.serverURL;

  private cartDataClient: CartModelPublic = {prodData: [{incart: 0, id: 0}], total: 0};  // This will be sent to the backend Server as post data
  // Cart Data variable to store the cart information on the server
  private cartDataServer: any = {
    data: [{
      product: undefined,
      numInCart: 0
    }],
    total: 0
  };

  cartTotal$ = new BehaviorSubject<number>(0);
  // Data variable to store the cart information on the client's local storage

  cartDataObs$ = new BehaviorSubject<CartModelServer>(this.cartDataServer);


  constructor(private productService: ProductService,
              private orderService: OrderService,
              private httpClient: HttpClient,
              private router: Router,
              private spinner: NgxSpinnerService,
              private toast: ToastrService) {

    this.cartTotal$.next(this.cartDataServer.total);
    this.cartDataObs$.next(this.cartDataServer);

    let info: CartModelPublic = JSON.parse(localStorage.getItem('cart') || '{}' as 'cart');

    if (info !== null && info !== undefined && info.prodData[0].incart !== 0) {
      // assign the value to our data variable which corresponds to the LocalStorage data format
      this.cartDataClient = info;
      // Loop through each entry and put it in the cartDataServer object
      this.cartDataClient.prodData.forEach(p => {
        this.productService.singleProduct(p.id).subscribe((actualProdInfo: productModelServer) => {
          if (this.cartDataServer.data[0].numInCart === 0) {
            this.cartDataServer.data[0].numInCart = p.incart;
            this.cartDataServer.data[0].product = actualProdInfo;
            this.calculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          } else {
            this.cartDataServer.data.push({
              numInCart: p.incart,
              product: actualProdInfo
            });
            this.calculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          }
          this.cartDataObs$.next({...this.cartDataServer});
        });
      });
    }
  }

  calculateSubTotal(index: number){
    let subTotal = 0;

    let p = this.cartDataServer.data[index];
    // @ts-ignore
    subTotal = p.product.price * p.numInCart;

    return subTotal;
  }

  addProductToCart(id: number, quantity?: number) {

    this.productService.singleProduct(id).subscribe(prod => {
      // console.log(this.cartDataServer.data[0].product )
      // If the cart is empty
      if (this.cartDataServer.data[0].product === undefined) {
        this.cartDataServer.data[0].product = prod;        
        this.cartDataServer.data[0].numInCart = quantity !== undefined ? quantity : 1;
        this.calculateTotal();
        this.cartDataClient.prodData[0].incart = this.cartDataServer.data[0].numInCart;
        this.cartDataClient.prodData[0].id = prod.id;
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartDataObs$.next({...this.cartDataServer});
        this.toast.success(`${prod.name} added to the cart.`, "Product Added", {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        })
      }  // END of IF
      // Cart is not empty
      else {
        let index = this.cartDataServer.data.findIndex((p: any) => p.product.id == prod.id);

        // 1. If chosen product is already in cart array
        if (index !== -1) {

          if (quantity !== undefined && quantity <= prod.quantity) {
            // @ts-ignore
            this.cartDataServer.data[index].numInCart = this.cartDataServer.data[index].numInCart < prod.quantity ? quantity : prod.quantity;
          } else {
            // @ts-ignore
            this.cartDataServer.data[index].numInCart < prod.quantity ? this.cartDataServer.data[index].numInCart++ : prod.quantity;
          }


          this.cartDataClient.prodData[index].incart = this.cartDataServer.data[index].numInCart;
          this.toast.info(`${prod.name} quantity updated in the cart.`, "Product Updated", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          })
        }
        // 2. If chosen product is not in cart array
        else {
          this.cartDataServer.data.push({
            product: prod,
            numInCart: 1
          });
          this.cartDataClient.prodData.push({
            incart: 1,
            id: prod.id
          });
          this.toast.success(`${prod.name} added to the cart.`, "Product Added", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          })
        }
        this.calculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartDataObs$.next({...this.cartDataServer});
      }  // END of ELSE


    });
  }

  updateCartItem(index: number, increase: boolean) {
    let data = this.cartDataServer.data[index];
    if (increase) {
      // @ts-ignore
      data.numInCart < data.product.quantity ? data.numInCart++ : data.product.quantity;
      this.cartDataClient.prodData[index].incart = data.numInCart;
      this.calculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;
      this.cartDataObs$.next({...this.cartDataServer});
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
    } else {
      // @ts-ignore
      data.numInCart--;

      // @ts-ignore
      if (data.numInCart < 1) {
        this.deleteProductFromCart(index);
        this.cartDataObs$.next({...this.cartDataServer});
      } else {
        // @ts-ignore
        this.cartDataObs$.next({...this.cartDataServer});
        this.cartDataClient.prodData[index].incart = data.numInCart;
        this.calculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }

    }

  }

  deleteProductFromCart(index:number) {
    /*    console.log(this.cartDataClient.prodData[index].prodId);
        console.log(this.cartDataServer.data[index].product.id);*/

    if (window.confirm('Are you sure you want to delete the item?')) {
      this.cartDataServer.data.splice(index, 1);
      this.cartDataClient.prodData.splice(index, 1);
      this.calculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;

      if (this.cartDataClient.total === 0) {
        this.cartDataClient = {prodData: [{incart: 0, id: 0}], total: 0};
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      } else {
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }

      if (this.cartDataServer.total === 0) {
        this.cartDataServer = {
          data: [{
            product: undefined,
            numInCart: 0
          }],
          total: 0
        };
        this.cartDataObs$.next({...this.cartDataServer});
      } else {
        this.cartDataObs$.next({...this.cartDataServer});
      }
    }
    // If the user doesn't want to delete the product, hits the CANCEL button
    else {
      return;
    }


  }

  CheckoutFromCart(userId: Number) {

    this.httpClient.post<any>(`${this.ServerURL}orders/payment`, null).subscribe((res: { success: boolean }) => {
      console.clear();

      if (res.success) {


        this.resetServerData();
        this.httpClient.post<any>(`${this.ServerURL}orders/new`, {
          userId: userId,
          products: this.cartDataClient.prodData
        }).subscribe((data: OrderConfirmationResponse) => {

          this.orderService.getSingleOrder(data.order_id).then(prods => {
            if (data.success) {
              const navigationExtras: NavigationExtras = {
                state: {
                  message: data.message,
                  products: prods,
                  orderId: data.order_id,
                  total: this.cartDataClient.total
                }
              };
              this.spinner.hide().then();
              this.router.navigate(['/thanks'], navigationExtras).then(p => {
                this.cartDataClient = {prodData: [{incart: 0, id: 0}], total: 0};
                this.cartTotal$.next(0);
                localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
              });
            }
          });

        })
      } else {
        this.spinner.hide().then();
        this.router.navigateByUrl('/checkout').then();
        this.toast.error(`Sorry, failed to book the order`, "Order Status", {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        })
      }
    })
  }


  private calculateTotal() {
    let Total = 0;

    this.cartDataServer.data.forEach((p:any) => {
      const {numInCart} = p;
      const {price} = p.product;
      // @ts-ignore
      Total += numInCart * price;
    });
    this.cartDataServer.total = Total;
    this.cartTotal$.next(this.cartDataServer.total);
  }

  private resetServerData() {
    this.cartDataServer = {
      data: [{
        product: undefined,
        numInCart: 0
      }],
      total: 0
    };
    this.cartDataObs$.next({...this.cartDataServer});
  }

}

interface OrderConfirmationResponse {
  order_id: Number;
  success: Boolean;
  message: String;
  products: [{
    id: String,
    numInCart: String
  }]
}