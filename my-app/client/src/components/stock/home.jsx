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
                    <h2>Register</h2>
                    <h2>Log in</h2>
                </header>
            </div>
        )
}

export default Home;
