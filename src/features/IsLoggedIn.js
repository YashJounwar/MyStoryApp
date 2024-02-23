import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn : false,
    user : null
}


const loggedInSlice = createSlice({
    name : 'loggedIn',
    initialState,
    reducers : {
        isLoggedIn : (state, action) => {
            console.log("User Is Currently Logged In", action.payload);
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        isLoggedOut : (state, action) => {
            state.isLoggedIn = false;
            state.user = action.payload;
        }
    }
})

export const loggedInReducer = loggedInSlice.reducer;
export const {isLoggedIn, isLoggedOut} = loggedInSlice.actions;