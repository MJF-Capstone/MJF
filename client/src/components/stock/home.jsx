// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import '../../App.css';
// import Login from
// '../auth/verification';'../../../../server/controllers/user-auth';
// import { useNavigate } from 'react-router-dom'

function Home() {
   
        return (
            <div className="homeBackgroundImage" style={{
                backgroundImage:
"url('https://images.unsplash.com/photo-1493925410384-84f842e616fb?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
              }}>
                 <div className="Name">
        {/* <header className="App-header"> */}
          <p1>Coffee </p1>
          <p3>Keeper</p3>
        {/* </header> */}
            {/* <div className="Modal"> */}
                <header className="Modal-header">
                  <a href="/verification"><button
className="homeButton">LOGIN</button></a><br/>
                  <a href="/register"><button
className="homeButton">REGISTER</button></a>
                </header>
                {/* {login && <p>{login}</p>} */}
                {/* {data && <div>{JSON.stringify(data)}</div>} */}
            {/* </div> */}
        </div>
        </div>
        );
    }
export default Home;

