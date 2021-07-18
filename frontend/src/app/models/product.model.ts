export interface productModelServer{
    id: number;
    name: string;
    category: string;
    description: string;
    image:string;
    price: number;
    quantity: number;
    images: string;

}

export interface serverResponse{
    count: number;
    products: productModelServer[];
    responseCode: string;
} 