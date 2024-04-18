import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css'

function Home() {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/stock/home')
           .then(response => {
                setData(response.data);
           })
           .catch(error => {
                console.error('error fetching data from /home:', error);
            });
        }, []);

        return (
            <div className="Modal">
                <header className="Modal-header">
                  <a href="/login"><button>LOGIN</button></a><br></br>
                  <a href="/register"><button>REGISTER</button></a>
                </header>
            </div>
        )
}

export default Home;
