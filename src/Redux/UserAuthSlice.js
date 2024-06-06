import { createSlice } from '@reduxjs/toolkit';
import APIS from '../axios/Index.js';

const initialState = {
    getuser: null,
    isLogin: false,
    authUser: {}
};

const GetProfile = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        GET_USER_PROFILE: (state, action) => {
            console.log(action.payload, '========12');
            return {
                ...state,
                getuser: action.payload
            };
        },
        LOGIN_SUCCESS: (state, action) => {
            console.log(action.payload, '========13');
            return {
                ...state,
                authUser: action.payload
            };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(APIS?.profileGet.fulfilled, (state, action) => {
            state.getuser = action.payload;
            state.isLogin = true;
        });

        builder.addCase(APIS?.profileGet.rejected, (state, action) => {
            console.log("Failed =======>", action.payload);
        });

        builder.addCase(APIS?.authLogin.fulfilled, (state, action) => {
            state.authUser = action.payload;
            state.isLogin = true;
        });

        builder.addCase(APIS?.authLogin.rejected, (state, action) => {
            console.log("Failed =======>", action.payload);
        });
    }
});

export const { GET_USER_PROFILE, LOGIN_SUCCESS } = GetProfile.actions;

export default GetProfile.reducer;