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
        navigate('/user-dashboard');    
      } catch (err) {
        console.log(err);}}

 return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleRegistration}>
        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" required />
            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" required />
            <input type="text" value={shopName} onChange={e => setShopName(e.target.value)} placeholder="Shop Name" required />
            <input type="password" value={employeeId} onChange={e => setEmployeeId(e.target.value)} placeholder="Employee ID" required />
            <div>
              <label>
                <input type="checkbox" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} />
              </label>
            </div>
            <button type="submit">Register</button>
        </form>
      </header>
    </div>
  );
}

export default Registration;