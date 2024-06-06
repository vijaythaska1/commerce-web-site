import { configureStore } from '@reduxjs/toolkit'
import SidebarReducer from "./SidebarSlice.js"
import UserAuth from "./UserAuthSlice.js"
export const store = configureStore({
  reducer: {
    getProfile: UserAuth,
    sidebar: SidebarReducer
  },
})