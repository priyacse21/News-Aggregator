import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './signup.css'; // Ensure the correct path

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/signup', { username, email, password });
      alert('Signup successful');
      navigate('/login'); // Navigate to login page on successful signup
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert('User already exists');
      } else {
        alert('Signup failed');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h2>Signup</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="input-field"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="input-field"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="input-field"
      />
      <button type="submit" className="signup-button">Submit</button>
      <p>Already have an account? <span><a href='/login'>Login</a></span></p>
    </form>
  );
};

export default Signup;
