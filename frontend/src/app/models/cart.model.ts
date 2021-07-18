import { productModelServer } from "./product.model";

export interface CartModelServer {
    total: number;
    data: [{
      product: productModelServer,
      numInCart: number
    }];
  }
  
  export interface CartModelPublic {
    total: number;
    prodData: [{
      id: number,
      incart: number
    }]
  }

// export interface CartModelServer{

//     total: number;
//     data: 
//         [{
//             product: productModelServer,
//             numInCart: number
//         }
//         ];  
// }

// export interface CartModelPublic{
//     total: number;
//     productData: [
//         {
//             id: number,
//             incart: number
//         }
//     ];

// }

// export interface CartDataClient {
//     total: 0,
//     prodData:[
//       {
//         id:0,
//         incart: 0
//       }
//     ]

//   };

//   export interface CartDataServer {
//     data: [{
//       product: undefined,
//       numInCart: 0
//     }],
//     total: 0
//   };

  export const CartDataServer={
    data: [{
      product: undefined,
      numInCart: 0
    }],
    total: 0
  };

