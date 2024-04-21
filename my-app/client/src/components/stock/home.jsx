import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
// import Login from '../auth/verification';'../../../../server/controllers/user-auth';
// import { useNavigate } from 'react-router-dom'

function Home() {
    const [data, setData] = useState(null);
    const [login, setLogin] = useState('');
    // const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:8000/user-auth/verify-token', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
           .then(response => {
                setLogin('You have successfully signed in!');
                
           })
           .catch(error => {
                console.error('error verifying');
            });
        }
        axios.get('http://localhost:8000/stock/home')
        .then(response => {
            setData(response.data);
        })
            .catch(error => {
                console.error('error fetching data from /home:', error);
            }) 
    }, []);

        return (
            <div className="Modal">
                <header className="Modal-header">
                  <a href="/verification"><button>LOGIN</button></a><br></br>
                  <a href="/register"><button>REGISTER</button></a>
                </header>
            </div>
        )
}

export default Home;
