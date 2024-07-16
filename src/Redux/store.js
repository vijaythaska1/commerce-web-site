import { configureStore } from '@reduxjs/toolkit'
import SidebarReducer from "./SidebarSlice.js"
import userAuthReducer from "./UserAuthSlice.js"
export const store = configureStore({
  reducer: {
    getProfile: userAuthReducer,
    sidebar: SidebarReducer
  },
})