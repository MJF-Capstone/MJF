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
  );
}

export default Registration;