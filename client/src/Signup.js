import { React, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = (event) => {
        event.preventDefault();
        axios.post('http://localhost:9000/signup', { firstName, lastName, userid, password })
            .then((res) => alert('User registered successfully!'))
            .catch((err) => alert('Error signing up'));
    };

    return (
        <div>
            <NavBar />
            <div className="form-container">
                <h1>Sign Up</h1>
                <form onSubmit={handleSignup}>
                    <label>First Name</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    <label>Last Name</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    <label>User ID</label>
                    <input type="text" value={userid} onChange={(e) => setUserid(e.target.value)} required />
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Submit</button>
                </form>
                <p className="link">Already have an account? <a href="/Login">Login</a></p>
            </div>
        </div>
    );
}

export default Signup;