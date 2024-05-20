import { createSlice } from '@reduxjs/toolkit'
import APIS from '../axios/Index.js';
const initialState = {
  value: 0,
  data: [],
  isLogin: false,
  authUser: {}
}

export const SidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    togglesidebar: (state, action) => {
      state?.value === 0 ? state.value = 1 : state.value = 0;
      return state
    },
  },


  extraReducers: (bulder) => {
    bulder.addCase(APIS?.authLogin.fulfilled, (state, action) => {
      state.authUser = action.payload;
      state.isLogin = true;
      return state
    })
    bulder.addCase(APIS?.authLogin.rejected, (state, action) => {
      console.log("Failed =======", action.payload);

    })
  },

  LOGIN_SUCCESS: (state, action) => {
    console.log(action.payload,'===========================12')
    return {
      ...state, authUser: action.payload
    }
  }

})


export const { togglesidebar,LOGIN_SUCCESS } = SidebarSlice.actions

export default SidebarSlice.reducer