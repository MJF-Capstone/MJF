import React from 'react';
import './App.css'; 

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import StockDashboard from './components/stock/stock-dashboard'; 


function App() {
  return (
    <div className="backgroundImage" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1525088553748-01d6e210e00b?q=80&w=2976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
      }}>
      <div className="App">
        <header className="App-header">
          <p1>Coffee </p1>
          {/* <p2>Shop </p2> */}
          <p3>Keeper</p3>
        </header>
        <Router>
          <div>
            <Routes>
              <Route path="stock/stockdashboard" element={<StockDashboard />} />
            </Routes>
          </div>
        </Router>
      </div>
      <div className="AddStock">
        {/* <h2>Add Stock Page</h2> */}
      </div>
      </div>
   
  );
}

export default App;
