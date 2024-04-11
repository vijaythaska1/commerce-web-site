import { createSlice } from '@reduxjs/toolkit'
import { fetchData, loginUserPost } from '../axios/APIServices.js';
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
    bulder.addCase(APIS?.authLogin.fulfilled , (state , action) => {
  
console.log( action.payload);
    })
  }

})


export const { togglesidebar } = SidebarSlice.actions

export default SidebarSlice.reducer