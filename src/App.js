import React from 'react';
import './App.css';
import Layout from './commpand/Layout.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loginpage from './pages/LoginPage.jsx';
import Profile from './pages/Admin/Profile.jsx';
import ChangePassword from './pages/Admin/ChangePassword.jsx';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Loginpage />} />
        <Route element={<Layout />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/ChangePassword' element={<ChangePassword />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;