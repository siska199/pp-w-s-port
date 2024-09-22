import { createSlice } from "@reduxjs/toolkit";


const initialState : TRAuthState  = {
    isLogin:false,
    user : null
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {

    }
})


export default authSlice.reducer