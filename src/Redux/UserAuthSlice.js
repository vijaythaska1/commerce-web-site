import { createSlice } from '@reduxjs/toolkit';
import APIS from '../axios/Index.js';

const initialState = {
    getuser: null,
    GetCms: null,
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
            })

            .addCase(APIS.logout.fulfilled, (state, action) => {
                state.user = null;
                state.isAuthenticated = false;
                state.error = null;
            })

            .addCase(APIS.logout.rejected, (state, action) => {
                state.error = action.payload || 'Failed to logout';
            })

            .addCase(APIS.cmsget.fulfilled, (state, action) => {
                state.GetCms = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })

            .addCase(APIS.cmsget.rejected, (state, action) => {
                state.error = action.payload || "Faliled to CMS"
            })

            .addCase(APIS?.UpdateCms.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.error = null;
                // if (state.GetCms && state.GetCms.data) {
                //     state.GetCms.data.body = action.payload.data.body;
                // }
            })

            .addCase(APIS?.UpdateCms.rejected, (state, action) => {
                state.error = action.payload || 'Upadte failed';
            })
    }
});
export const { clearError, logout } = profileSlice.actions;

export default profileSlice.reducer;