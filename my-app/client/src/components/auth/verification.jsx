import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';

function Login() {
    // State variables to store user input and login status
    const [shopName, setShopName] = useState("")
    const [employeeId, setEmployeeId] = useState("")
    const [invalid, setInvalid] = useState(false)
    const navigate = useNavigate(); // State to track invalid login attempts

    // Hook for navigation

    // Function to handle user login
    const handleLogin = async () => {
      try {
        const response =  await axios.post("http://localhost:8000/user-auth/login", {
           shopName,
           employeeId
        });
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          navigate("/home");
        } else {
          setInvalid(true);
        }
      } catch (err) {
        console.error("Login error:");
        setInvalid(true);
        }
    };
            
    return (
      <div className="homeBackgroundImage" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1525088553748-01d6e210e00b?q=80&w=2976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
      }}>
                  <div className="Name">
        {/* <header className="App-header"> */}
          <p1>Coffee </p1>
          <p3>Keeper</p3>
       <div className="input-form">
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
          <br />
          {/* Button to trigger login */}
          <button className="button" onClick={handleLogin}>
              SUBMIT
          </button>
<h1>
               Don't have an account? </h1><Link to="/register"><h1>Create Account</h1></Link>
                </div>
      </div>
    </div>
    )
}

export default Login