import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Login() {
    // State variables to store user input and login status
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [invalid, setInvalid] = useState(false) // State to track invalid login attempts

    // Hook for navigation
    const nav = useNavigate()

    // Function to handle user login
    const handleLogin = () => {
        fetch("http://localhost:8000/user-auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password
            }),
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.token) {
                   localStorage.setItem("token", res.token)
                    // If login is successful, navigate to a different route (e.g., dashboard)
                    nav("/dashboard")
                } else {
                    // If login fails, set invalid state to true to display error message
                    setInvalid(true)
                }
            })
            .catch(error => {
                console.error("Login error:", error)
                // Handle other errors if necessary
            })
    }

    return (
        <>
            <div className="input-form">
                <input
                    className="info-input"
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={e => {
                        setUsername(e.target.value)
                    }}
                />
                <br />
                <input
                    className="info-input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={e => {
                        setPassword(e.target.value)
                    }}
                />
                {/* Render error message if login is invalid */}
                {invalid && <span className="invalid">Invalid username or password</span>}
                <br />
                {/* Button to trigger login */}
                <button className="button" onClick={handleLogin}>
                    Login
                </button>

                {/* Link to register page */}
                Don't have an account? <Link to="register">Create Account</Link>
            </div>
        </>
    )
}

export default Login