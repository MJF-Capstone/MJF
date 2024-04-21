import React from 'react';
import './App.css'; 

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import StockDashboard from './components/stock/stock-dashboard'; 
import Home from './components/stock/home';
import Filter from './components/stock/filter';
import UserDashboard from './components/stock/user-dashboard';
import Login from './components/auth/verification';
import Registration from './components/auth/registration';

function App() {
  return (
    <div className="backgroundImage" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1525088553748-01d6e210e00b?q=80&w=2976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
      }}>
      <div className="App">
        <header className="App-header">
          <p1>Coffee </p1>
          <p3>Keeper</p3>
        </header>
        <Router>
          <div>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/verification" element={<Login />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/stockdashboard" element={<StockDashboard />} />
              <Route path="/filter" element={<Filter />} />
            </Routes>
          </div>
        </Router>
      </div>
      <div className="AddStock">
      </div>
      </div>
   
  );
}

export default App;
