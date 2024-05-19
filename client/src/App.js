import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import StockDashboard from './components/stock/stock-dashboard';
import Home from './components/stock/home';
import Filter from './components/stock/filter';

import Login from './components/auth/verification';
import Registration from './components/auth/registration';
import UserProfile from './components/auth/user-profile';

function App() {
  const [userInfo, setUserInfo] = useState("")
  useEffect(() => {
    const info = localStorage.getItem("userInfo")
    JSON.parse(info)
    setUserInfo(JSON.parse(info))
  }, [])
  return (
    // <div className="backgroundImage" style={{
    //     backgroundImage: "url('https://images.unsplash.com/photo-1493925410384-84f842e616fb?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
    //   }}>
    // <div className="Name">
    //   {/* <header className="App-header"> */}
    //     <p1>Coffee </p1>
    //     <p3>Keeper</p3>
    //   {/* </header> */}
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/verification" element={<Login userInfo={userInfo} setUserInfo={setUserInfo} />} />
            <Route path="/userprofile" element={<UserProfile userInfo={userInfo} setUserInfo={setUserInfo} />} />

            <Route path="/stockdashboard" element={<StockDashboard />} />
            <Route path="/filter" element={<Filter />} />
          </Routes>
        </div>
      </Router>
      {/* </div> */}
      <div className="AddStock">
      </div>
    </div>

  );
}

export default App;
