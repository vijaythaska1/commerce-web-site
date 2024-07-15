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
});


export const { togglesidebar, LOGIN_SUCCESS } = SidebarSlice.actions

export default SidebarSlice.reducer