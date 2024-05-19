import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
//import axios from 'axios';

function Login({setUserInfo, userInfo}) {
  // State variables to store user input and login status
  const [shopName, setShopName] = useState("")
  const [employeeId, setEmployeeId] = useState("")
  const [invalid, setInvalid] = useState(false)
  
  const navigate = useNavigate(); // State to track invalid login attempts
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token");
    if (isLoggedIn) {
     console.log(Login);
    }
  }, [])

  

  // Function to handle user login
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/user-auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          shopName,
          employeeId
        })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          localStorage.setItem("token", data.token);
          
          localStorage.setItem("userInfo", JSON.stringify(data.user))
          navigate("/userprofile");
        } else {
          setInvalid(true);
        }
      } else {
        setInvalid(true);
      }
    } catch (err) {
      console.error("Login error:", err);
      setInvalid(true);
    }
  };

  return (
    <div className="verificationBackgroundImage" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1493925410384-84f842e616fb?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
    }}>
      {/* <div className="Name"> */}
      {/* <header className="App-header"> */}
      <p1>Coffee </p1>
      <p3>Keeper</p3>
    <div className="registration">
      {/* <div className="input-form"> */}
        <input
          type="text"
          value={shopName}
          placeholder="Shop Name"
          onChange={e => {
            setShopName(e.target.value)
          }}
        />
        <br />
        <input
          type="password"
          value={employeeId}
          onChange={e =>
            setEmployeeId(e.target.value)}
          placeholder="Employee ID"
        />
        {/* Render error message if login is invalid */}
        {invalid && <span className="invalid">Invalid username or password</span>}
        {/* <br /> */}
        {/* Button to trigger login */}
        {/* </div> */}
      {/* </div> */}

      <h1>
        <button className="registrationButton2" onClick={handleLogin}>
          SUBMIT
        </button></h1>
      <h4>
        Don't have an account? </h4><Link to="/register"><h5>Create Account</h5></Link>
    </div>
    // </div>
  )
}

export default Login