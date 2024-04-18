import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../../App.css'

function Home() {
    const [] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/stock/home')
           
            })
    
    return (
        <div className="Modal">
            <header className="App-header">
               
            </header>
        </div>
    );
}
export default Home;
