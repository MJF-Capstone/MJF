import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

function UserProfile({ setUserInfo, userInfo }) {


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
                <p1>Coffee</p1>
                    <p3>Keeper</p3>
            <div className='userProfile'>
            <div className='homeButton2'>Welcome, {userInfo.firstName}!</div>

                <Link to="/stockdashboard">
                    <button className="homeButton2">INVENTORY</button>
                </Link>
                <Link to="/">
                    <button className="homeButton2">LOGOUT</button>
                </Link>
            </div>
            {userInfo && (
                <div className="registration1" >
                    <h2>User Profile</h2>
                    <div className="profileContainer">
                        <div className="profileImage">
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D"/>
                            </div>
                            <div className="profileInfo">
                    {!editMode ? (
                        <>
                            <p5>First Name:</p5>
                                <p>{userInfo.firstName}</p>
                            <p5>Last Name:</p5>
                                <p>{userInfo.lastName}</p>
                            <p5>Shop Name:</p5>
                                <p>{userInfo.shopName}</p>
                            <p5>Employee Id:</p5>
                                <p>{userInfo.employeeId}</p>
                            <button type="button" className="registrationButton3" onClick={handleEditClick}>Edit Profile</button>
                        </>
                    ) : (
                        <>
                        
                            <div className='form-div'>
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
                                <button type="submit" className="registrationButton3" onClick={handleSubmit}>Save</button>
                                <button type="button" className="registrationButton3" onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        </>
                    )}
                </div>
                </div>
                </div>
            )}
        </div>
    );
}

export default UserProfile;