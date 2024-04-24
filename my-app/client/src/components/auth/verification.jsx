import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';

function Login() {
    // State variables to store user input and login status
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [invalid, setInvalid] = useState(false)
    const navigate = useNavigate(); // State to track invalid login attempts

    // Hook for navigation

    // Function to handle user login
    const handleLogin = async () => {
      try {
        const response =  await axios.post("http://localhost:8000/user-auth/verification", {
           username,
           password
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
      <div className="verificationBackgroundImage" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1493925410384-84f842e616fb?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
      }}>
                  {/* <div className="Name"> */}
        {/* <header className="App-header"> */}
          <p1>Coffee </p1>
          <p3>Keeper</p3>
       <div className="input-form">
           <input
              type="text"
              value={username}
              placeholder="Username"
              onChange={e => {
                setUsername(e.target.value)
              }}
              />
          <br />
          <input
              type="password"
              value={password}
              onChange={e =>
                setPassword(e.target.value)}
                placeholder="Password"
                />
          {/* Render error message if login is invalid */}
          {invalid && <span className="invalid">Invalid username or password</span>}
          {/* <br /> */}
          {/* Button to trigger login */}
                </div>
                <h1>
          <button className="submitButton" onClick={handleLogin}>
              SUBMIT
          </button></h1>
<h4>
               Don't have an account? </h4><Link to="/register"><h4>Create Account</h4></Link>
      </div>
    // </div>
    )
}

export default Login