import { React, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

function Login() {
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        axios.post('http://localhost:9000/login', { userid, password })
            .then((res) => {
                alert('Login successful!');
                navigate('/ViewProjects');
            })
            .catch((err) => alert('Invalid credentials'));
    };

    return (
        <div>
            <NavBar />
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <label>User ID</label>
                    <input type="text" value={userid} onChange={(e) => setUserid(e.target.value)} required />
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Submit</button>
                </form>
                <p className="link">Don't have an account? <a href="/Signup">Sign Up</a></p>
            </div>
        </div>
    );
}

export default Login;