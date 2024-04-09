import { createSlice } from '@reduxjs/toolkit'
import { fetchData } from '../axios/axios.js';
const initialState = {
  value: 0,
  data: []
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
    bulder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload
    })
  }

})


export const { togglesidebar } = SidebarSlice.actions

export default SidebarSlice.reducer