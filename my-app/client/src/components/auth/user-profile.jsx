import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function UserProfile() {
    const [userInfo, setUserInfo] = useState(null);
    const[userId, setUserId]= useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/user-auth/66299e010c378625c0c59ced',
                    {
                        method: "GET",
                        headers: new Headers({ "Content-Type": "application/json" })
                    });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUserInfo(data.user);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [userId]);

    return (
        <div className="homeBackgroundImage" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1493925410384-84f842e616fb?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
        }}>
            <header className="App-header">
                <p>Coffee Keeper</p>
                <h1>Welcome!</h1>
            </header>
            <div className='userProfile'>
                <Link to="/stockdashboard">
                    <button className="homeButton">INVENTORY</button>
                </Link>
                <Link to="/stockdashboard">
                    <button className="homeButton">NOTIFICATIONS</button>
                </Link>
                <Link to="/home">
                    <button className="homeButton">LOGOUT</button>
                </Link>
            </div>
            {userInfo && (
                <div className="userInfo">
                    <h2>User Profile</h2>
                    <p>First Name: {userInfo.firstName}</p>
                    <p>Last Name: {userInfo.lastName}</p>
                    <p>Shop Name: {userInfo.shopName}</p>
                    <p>Employee Id: {userInfo.employeeId}</p>
                </div>
            )}
        </div>
    );
}

export default UserProfile;

