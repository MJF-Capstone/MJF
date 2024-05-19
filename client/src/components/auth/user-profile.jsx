import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

function UserProfile({setUserInfo, userInfo}) {
    

    const [editMode, setEditMode] = useState(false);
    const [editUserInfo, setEditUserInfo] = useState(userInfo);
   

    useEffect(() => {
        setEditUserInfo(userInfo);
    }, [userInfo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setEditUserInfo(userInfo);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/user-auth/${userInfo._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editUserInfo)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUserInfo(data.updatedUser);
            localStorage.setItem('userInfo', JSON.stringify(data.updatedUser));
            setEditMode(false);
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };

    return (
        <div className="homeBackgroundImage" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1493925410384-84f842e616fb?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
        }}>
            <header className="App-header">
                <p1>Coffee</p1>
                    <p3>Keeper</p3>
            </header>
            <div className='userProfile'>
                <Link to="/stockdashboard">
                    <button className="homeButton">INVENTORY</button>
                </Link>
                <Link to="/stockdashboard">
                    <button className="homeButton">NOTIFICATIONS</button>
                </Link>
                <Link to="/">
                    <button className="homeButton">LOGOUT</button>
                </Link>
            </div>
            {userInfo && (
                <div className="userInfo" >
                    <h2>User Profile Form</h2>
                    {!editMode ? (
                        <>
                            <p>First Name: {userInfo.firstName}</p>
                            <p>Last Name: {userInfo.lastName}</p>
                            <p>Shop Name: {userInfo.shopName}</p>
                            <p>Employee Id: {userInfo.employeeId}</p>
                            
                                <button type="button" onClick={handleEditClick}>Edit Profile</button>
                        </>
                    ) : (
                        <>
                            <label>
                                First Name:
                                <input type="text" value={editUserInfo.firstName} onChange={handleChange} name="firstName" />
                            </label>
                            <label>
                                Last Name:
                                <input type="text" value={editUserInfo.lastName} onChange={handleChange} name="lastName" />
                            </label>
                            <label>
                                Shop Name:
                                <input type="text" value={editUserInfo.shopName} onChange={handleChange} name="shopName" />
                            </label>
                            <label>
                                Employee Id:
                                <input type="text" value={editUserInfo.employeeId} onChange={handleChange} name="employeeId" />
                            </label>
                            <button type="submit" onClick={handleSubmit}>Save</button>
                            <button type="button" onClick={handleCancelEdit}>Cancel</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default UserProfile;