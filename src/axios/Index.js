import { createAsyncThunk } from '@reduxjs/toolkit';
import APIServices from './APIServices.js';
const APIS = {};
APIS.authLogin = createAsyncThunk('auth/login', APIServices?.adminLogin);
APIS.profileGet = createAsyncThunk('auth/UserProfile', APIServices?.ProfilGet);

export default APIS;