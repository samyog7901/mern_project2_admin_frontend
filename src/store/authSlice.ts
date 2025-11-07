import {createSlice,PayloadAction} from '@reduxjs/toolkit' 
import { AppDispatch } from './store'
import { Status } from '../types/status'
import { API } from '../http'


interface LoginData{
    email : string, 
    password : string
}

interface User{
    username : string | null, 
    email : string | null, 
    password : string | null, 
    token : string | null,
    role : string | null

}

interface AuthState{
    user : User,
    status : Status, 
    token : string | null,
    role ?: string | null
}

const initialState:AuthState = {
    user : {} as User,
    status : Status.LOADING, 
    token : null,
    role : null
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        setUser(state:AuthState,action:PayloadAction<User>){
            state.user = action.payload,
            state.role = action.payload.role
            state.token = action.payload.token
        },
        setStatus(state:AuthState,action:PayloadAction<Status>){
            state.status = action.payload
        },
        resetStatus(state:AuthState){
            state.status = Status.LOADING
        },
        setToken(state:AuthState,action:PayloadAction<string>){
            state.user.token = action.payload
        }, 
        setUserLogout(state:AuthState){
            state.token = null,
            state.role = null,
            state.user = {
                email : null, 
                password : null, 
                username : null, 
                token : null,
                role : null
            }
        }
    }
})

 export const {setUser,setStatus,resetStatus,setToken,setUserLogout} = authSlice.actions 
 export default authSlice.reducer



export function login(data:LoginData){
    return async function loginThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await API.post('login',data)
            if(response.status === 200){
                const {user, token} = response.data.data
                if(user.role !== 'admin'){
                    dispatch(setStatus(Status.ERROR))
                    alert("Access denied. Only admins can log in.")
                    return
                }
                dispatch(setUser({
                    username : user.username,
                    email : user.email,
                    password : null,
                    token,
                    role : user.role
                }))
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}


