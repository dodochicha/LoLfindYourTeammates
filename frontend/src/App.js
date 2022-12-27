import React from 'react';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import Register from './pages/RegisterPage/Register';
import Login from './pages/LoginPage/Login';
import { Route, Routes } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = "/" element={<HomePage />} />
        <Route path = "/register" element={<Register />} />
        <Route path = "/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
