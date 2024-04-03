import { configureStore } from '@reduxjs/toolkit'
import SidebarReducer from "./SidebarSlice.js"
export const store = configureStore({
  reducer: {
    sidebar: SidebarReducer
  },
})