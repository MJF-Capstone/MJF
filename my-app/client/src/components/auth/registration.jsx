import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Registration() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [shopName, setShopName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  // const [error, setError] = useState('');
  const navigate = useNavigate();

    const handleRegistration = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:8000/user-auth/register', {
          firstName,
          lastName,
          shopName,
          employeeId,
          isAdmin,
        });
        console.log('registration successful', response.data);
        navigate('/userdashboard');    
      } catch (err) {
        console.log(err);}}

 return (
  <div className="homeBackgroundImage" style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1525088553748-01d6e210e00b?q=80&w=2976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
  }}>
              <div className="Name">
    {/* <header className="App-header"> */}
      <p1>Coffee </p1>
      <p3>Keeper</p3>
    <div className="registration">
        <form onSubmit={handleRegistration}>
        <input className='registerButton' type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" required /><br/>
            <input className='registerButton'type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" required /><br/>
            <input className='registerButton'type="text" value={shopName} onChange={e => setShopName(e.target.value)} placeholder="Shop Name" required /><br/>
            <input className='registerButton'type="password" value={employeeId} onChange={e => setEmployeeId(e.target.value)} placeholder="Employee ID" required /><br/>
            <div>
              {/* <label> */}
              <p4>Admin?</p4>
                <input type="checkbox" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)}/>
              {/* </label> */}
            </div>
            <button className='registerButton' type="submit">Submit</button>
        </form>
    </div>
    </div>
    </div>
  );
}

export default Registration;