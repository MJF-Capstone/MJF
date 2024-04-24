import React from 'react';

function UserDashboard() {
  return (
    <div className="homeBackgroundImage" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1493925410384-84f842e616fb?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
    }}>
      {/* <header className="App-header"> */}
        <p1>Coffee </p1>
        <p3>Keeper</p3>
      <header className="App-header">
        <h1>Welcome!</h1>
      </header>
      <div className='userDashboard'>
        <a href="/stockdashboard"><button
          className="homeButton">INVENTORY</button></a>
        <a href="/stockdashboard"><button
          className="homeButton">NOTIFICATIONS</button></a>
        <a href="/home"><button
          className="homeButton">LOGOUT</button></a>
      </div>
    </div>
  );
}

export default UserDashboard;