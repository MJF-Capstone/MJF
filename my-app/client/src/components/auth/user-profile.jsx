import { Link } from 'react-router-dom';
import React, { useState, useEffect} from 'react'




function UserProfile() {

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {

        const user ={
          
        }
    })

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
        </div>
    );
}

export default UserProfile;
