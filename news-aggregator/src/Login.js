import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import './Login.css'; // Import CSS file for styling

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      if (response.data.message === 'Login successful') {
        login(response.data.token);
        alert('Login successful');
        navigate('/news');
      } else {
        alert('Login failed');
      }
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        <p className="signup-link">Don't have an account? <a href='/signup'>Sign Up</a></p>
      </form>
    </div>
  );
};

export default Login;















// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from './AuthContext';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const { login, logout } = useContext(AuthContext); // Destructure logout from AuthContext
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/login', { username, password });
//       if (response.data.message === 'Login successful') {
//         login(response.data.token); // Assuming you need to store the token
//         alert('Login successful');
//         navigate('/news'); // Redirect to news page after successful login
//       } else {
//         alert('Login failed');
//       }
//     } catch (err) {
//       alert('Login failed');
//     }
//   };

//   const handleLogout = () => {
//     logout(); // Call logout function from AuthContext
//     alert('Logged out successfully');
//     // Additional logic if needed, e.g., redirect to login page
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <h2>Login</h2>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Username"
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//         />
//         <button type="submit">Login</button>
//         <p>Don't have an account? <span><a href='/signup'>Sign Up</a></span></p>
//       </form>
//       <button onClick={handleLogout}>Logout</button> {/* Logout button */}
//     </div>
//   );
// };

// export default Login;
