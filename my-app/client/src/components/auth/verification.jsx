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
          <br />
          {/* Button to trigger login */}
          <button className="button" onClick={handleLogin}>
              SUBMIT
          </button>
<h1>
               Don't have an account? </h1><Link to="/register"><h1>Create Account</h1></Link>
      </div>
    
    )
}

export default Login