import React from 'react';
import './App.css';
import  Layout  from './commpand/Layout.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loginpage from './pages/LoginPage.jsx';
function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Loginpage />}/>
        <Route path='/Layout' element={<Layout />}>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;