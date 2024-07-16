import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  value: 0,
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


export const { togglesidebar } = SidebarSlice.actions

export default SidebarSlice.reducer