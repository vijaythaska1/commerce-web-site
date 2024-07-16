import { createSlice } from '@reduxjs/toolkit';
import APIS from '../axios/Index.js';

const initialState = {
    getuser: null,
    isAuthenticated: false,
    error: null,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(APIS?.profileGet.fulfilled, (state, action) => {
            state.getuser = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        })

        .addCase(APIS?.profileGet.rejected, (state, action) => {
            state.error = action.payload || 'Failed to fetch profile';
        })

        .addCase(APIS?.authLogin.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.error = null;
        })

        .addCase(APIS?.authLogin.rejected, (state, action) => {
            state.error = action.payload || 'Login failed';
        })

        .addCase(APIS.changePassword.fulfilled, (state, action) => {
            state.error = null;
        })
        .addCase(APIS.changePassword.rejected, (state, action) => {
            state.error = action.payload || 'Failed to change password';
        });
    }
});
export const { clearError, logout } = profileSlice.actions;

export default profileSlice.reducer;