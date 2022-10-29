import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userInfo",
    initialState:{
        userData: {}
    },

    reducers:{
        login: (state, action) => {
            state.userData = {...action.payload, isLogin: true};
        },

        logOut: (state, action) => {
            state.userData = {}
        },

        updatePassword: (state, action) => {
            state.userData = {...state.userData, ...action.payload}
        },

        setUserImg: (state, action) => {
            state.userData = {...state.userData, imgSrc: action.payload}
        }

    }
});

export const {login, logOut, updatePassword, setUserImg} = userSlice.actions;
export default userSlice.reducer;

