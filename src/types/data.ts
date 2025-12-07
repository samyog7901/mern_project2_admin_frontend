import { Status } from './status';

export interface User{
    id : string, 
    email : string, 
    username : string, 
    createdAt : string
}



export interface Product{
    
    productName : string,  
    description : string, 
    price : number, 
    stockQty : number; 
    imageUrl ?: string, 
    createdAt : string, 
    updatedAt? : string, 
    userId : string, 
    categoryId : string, 
    User? : User,
    id : string,
    Category? : Category

}
export enum PaymentMethod{
    COD = 'cod',
    Khalti = 'khalti'
}

export enum OrderStatus{
    Pending = '🕔 pending',
    Delivered = '✅ delivered',
    Ontheway = '🚍🚚 ontheway',
    Cancelled = '❌ cancelled',
    Preparation = '📦 preparation',
    All = 'all'
}
 export enum PaymentStatus{
    Paid = '✅ paid',
    Unpaid = '❌ unpaid',
    Pending = '🕔 pending'
}

interface Payment{
    paymentMethod : PaymentMethod
}
export interface ItemDetails{
    productId : string, 
    quantity : number
}
 export interface OrderData{
    phoneNumber : string, 
    shippingAddress : string, 
    totalAmount : number, 
    paymentDetails : Payment,
    items : ItemDetails[], 
    id : string, 
    orderStatus : OrderStatus,
    created_At : string
}
export interface Category{
    id : string, 
    categoryName : string
}



export interface SingleOrderItem {
    Order: {
      id: string;
      userId: string;
      orderStatus: string;
      totalAmount: number;
      phoneNumber: string;
      shippingAddress: string;
      Payment?: {
        paymentMethod: string;
        paymentStatus: PaymentStatus;
      };
      User?:{
        id : string,
        username : string,
        email?: string
      }
    };
    Product: {
      imageUrl: string;
      productName: string;
      price: number;
    };
    quantity: number;
    createdAt: string;
}

export interface InititalState{
    products : Product[], 
    users : User[],
    orders : OrderData[], 
    status : Status,
    bulkUploadStatus : Status,
    categories :Category[],
    singleProduct : Product | null, 
    singleOrder : SingleOrderItem[]

}


