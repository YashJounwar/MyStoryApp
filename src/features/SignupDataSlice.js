import { createSlice } from "@reduxjs/toolkit";
import { get } from "firebase/database";
import { db, refe } from "../DataBase/firebaseDB";

const initialState = {
    signupData : []
}


const SignupSlice = createSlice({
    name : 'signupData',
    initialState,
    reducers : {
        getSignupData : (state,action) => {
            
            get(refe(db,`/Users/user-${action.payload}`))
            .then((snapshot)=>{
                snapshot.forEach((childsnapshot)=>{
                    console.log("signupData childSnapshot", childsnapshot.val())
                    state.signupData.push(childsnapshot.val());
                })
            })
        }
    }
})

export const signupDataReducer = SignupSlice.reducer
export const {getSignupData} = SignupSlice.actions;