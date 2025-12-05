import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Category, InititalState, OrderData, OrderStatus, PaymentStatus, Product, SingleOrderItem, User } from '../types/data'
import { Status } from '../types/status'

import { AppDispatch } from './store'
import { APIAuthenticated } from '../http'


export interface AddProduct{
    productName : string, 
    description : string, 
    price : number, 
    stockQty : number, 
    imageUrl ?: string | null, 
    categoryId : string
}


const initialState:InititalState = {
    orders : [], 
    products : [], 
    users : [], 
    categories : [],
    singleOrder: [],
    status : Status.IDLE,
    bulkUploadStatus: Status.IDLE, 
    singleProduct : null
}

interface DeleteProduct{
    productId : string
}
interface DeleteUser{
    userId : string
}
interface DeleteOrder{
    orderId : string
}
interface DeleteCategory{
    categoryId : string
}

const dataSlice = createSlice({
    name : 'data', 
    initialState,
    reducers:{
        setStatus(state:InititalState,action:PayloadAction<Status>){
            state.status = action.payload
        }, 
        setProduct(state:InititalState,action:PayloadAction<Product[]>){
            state.products = action.payload 
        },
        setBulkUploadStatus(state: InititalState, action: PayloadAction<Status>) {
            state.bulkUploadStatus = action.payload;
        },
        resetBulkUploadStatus(state: InititalState) {
            state.bulkUploadStatus = Status.IDLE;
        },
         
        setOrders(state:InititalState,action:PayloadAction<OrderData[]>){
            state.orders = action.payload 
        }, 
        setCategories(state:InititalState,action:PayloadAction<Category[]>){
            state.categories = action.payload 
        },
        setUsers(state:InititalState,action:PayloadAction<User[]>){
            state.users = action.payload 
        },
        setSingleProduct(state:InititalState,action:PayloadAction<Product>){
            state.singleProduct = action.payload 
        }, 
        setDeleteProduct(state:InititalState,action:PayloadAction<DeleteProduct>){
            const index = state.products.findIndex(item=>item.id === action.payload.productId)
            state.products.splice(index,1)
        },
        setDeleteUser(state:InititalState,action:PayloadAction<DeleteUser>){
            const index = state.users.findIndex(item=>item.id === action.payload.userId)
            state.users.splice(index,1)
        }, 
        setDeleteOrder(state:InititalState,action:PayloadAction<DeleteOrder>){
            const index = state.orders.findIndex(item=>item.id === action.payload.orderId)
            state.orders.splice(index,1)
        }, 
        setDeleteCategory(state:InititalState,action:PayloadAction<DeleteCategory>){
            const index = state.categories.findIndex(item=>item.id === action.payload.categoryId)
            state.categories.splice(index,1)
        }, 
        setSingleOrder(state:InititalState,action:PayloadAction<SingleOrderItem[]>){
            state.singleOrder = action.payload
        }, 
        updateOrderStatusById(state:InititalState,action:PayloadAction<{orderId : string, status : OrderStatus}>){
           const index =  state.singleOrder.findIndex(order=>order.Order.id === action.payload.orderId)
            if(index !== -1){
                state.singleOrder[index].Order.orderStatus = action.payload.status 
                console.log(action.payload.status,"STATUS")
            }
        },
        updatePaymentStatusById(state:InititalState,action:PayloadAction<{orderId : string, status : PaymentStatus}>){
            const index =  state.singleOrder.findIndex(order=>order.Order.id === action.payload.orderId)
            if (index !== -1) {
                const order = state.singleOrder[index];
            
                if (order.Order.Payment) {
                  order.Order.Payment.paymentStatus = action.payload.status;
                } else {
                  order.Order.Payment = {
                    paymentMethod: "",
                    paymentStatus: action.payload.status,
                  };
                }
            
                console.log(action.payload.status, "STATUS");
              }
         },
         resetStatus(state){
            state.status = Status.IDLE
         }
        // setOrderStatus(state:InititalState,action:PayloadAction<{id:string,status:string}>){
        //     state.singleOrder
        // }, 
    }
})

export const {setOrders,setCategories,setSingleOrder,updateOrderStatusById, setDeleteCategory,setProduct,setBulkUploadStatus,resetBulkUploadStatus,setStatus,resetStatus,setUsers,setSingleProduct,setDeleteProduct,setDeleteUser,setDeleteOrder,updatePaymentStatusById} = dataSlice.actions
export default dataSlice.reducer 


export function fetchProducts(){
    return async function fetchProductsThunk(dispatch : AppDispatch ){
        dispatch(setStatus(Status.LOADING))
        try{
            const response = await APIAuthenticated.get('admin/product')
            if(response.status === 200){
                const {data} = response.data 
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setProduct(data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        }catch(error){
            dispatch(setStatus(Status.ERROR))
        }
    }
 }

 export function fetchOrders(){
    return async function fetchOrdersThunk(dispatch : AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.get('/order')
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setOrders(response.data.data))
            
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function fetchUsers(){
    return async function fetchUsersThunk(dispatch : AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.get('/users')
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setUsers(response.data.data))
            
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}


export function addProduct(data:AddProduct){
    return async function addProductThunk(dispatch : AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.post('/admin/product',data,{
                headers : {
                    "Content-Type" : "multipart/form-data"
                }
            })
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}
export function addBulkProducts(file: File) {
    return async function addBulkProductsThunk(dispatch: AppDispatch) {
      dispatch(setBulkUploadStatus(Status.LOADING));
      try {
        const formData = new FormData();
        formData.append("file", file);
  
        const response = await APIAuthenticated.post("/admin/product/bulk-upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        if (response.status === 200) {
          dispatch(setBulkUploadStatus(Status.SUCCESS));
        } else {
          dispatch(setBulkUploadStatus(Status.ERROR));
        }
      } catch (error) {
        console.error(error);
        dispatch(setBulkUploadStatus(Status.ERROR));
      }
    };
}
  
  

export function addCategory(data:{categoryName : string}){
    return async function addCategoryThunk(dispatch : AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.post('/admin/category',data)
            if(response.status === 200){
                dispatch(setCategories(response.data.data))
                dispatch(setStatus(Status.SUCCESS))
                
            
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function fetchCaetgories(){
    return async function fetchCaetgoriesThunk(dispatch : AppDispatch ){
        dispatch(setStatus(Status.LOADING))
        try{
            const response = await APIAuthenticated.get('admin/category')
            if(response.status === 200){
                const {data} = response.data
                dispatch(setCategories(data)) 
                dispatch(setStatus(Status.SUCCESS))
                
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        }catch(error){
            dispatch(setStatus(Status.ERROR))
        }
    }
 }
export function deleteProduct(id:string){
    return async function deleteProductThunk(dispatch : AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.delete('/admin/product/' + id)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setDeleteProduct({productId:id}))          
            }else{
                dispatch(setStatus(Status.ERROR))
                
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
           
        }
    }
}
export function deleteUser(id:string){
    return async function deleteUserThunk(dispatch : AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.delete('/users/' + id) //20 minutes
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setDeleteUser({userId:id}))

                
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}


// export function deleteOrder(id: string) {
//     return function deleteOrderThunk(dispatch: AppDispatch) {
//       dispatch(setDeleteOrder({ orderId: id }));
//     };
// }
  

export function deleteCategory(id:string){
    return async function deleteProductThunk(dispatch : AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.delete('/admin/category/' + id)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setDeleteCategory({categoryId : id}))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}


export function singleProduct(id:string){
    return async function singleProductThunk(dispatch : AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.get('/admin/product/' + id)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setSingleProduct(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function fetchSingleOrderById(id:string){
    return async function fetchSingleOrderByIdThunk(dispatch : AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.get('/order/customer/' + id)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setSingleOrder(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function handlePaymentStatusById(status:PaymentStatus,id:string){
    return async function handlePaymentStatusThunk(dispatch : AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.patch('/order/admin/payment/' + id,{paymentStatus : status})
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(updatePaymentStatusById({orderId:id,status}))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function handleOrderStatusById(status:OrderStatus,id:string){
    return async function handleOrderStatusThunk(dispatch : AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.patch('/order/admin/' + id,{orderStatus : status})
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(updateOrderStatusById({orderId:id,status}))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}
