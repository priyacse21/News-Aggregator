import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import News from './News';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import { AuthProvider, AuthContext } from './AuthContext'; // Import AuthProvider and AuthContext

const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

function App() {
  const [category, setCategory] = useState('general');
  const { isAuthenticated } = useContext(AuthContext); // Access isAuthenticated state from AuthContext

  return (
    <div className="App">
      <header className="App-header">
        <h1>ABC NEWS</h1>
        {isAuthenticated && (
          <nav>
            {categories.map((cat) => (
              <button
                key={cat}
                className={category === cat ? 'active' : ''}
                onClick={() => setCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </nav>
        )}
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/news" element={<News category={category} />} />
        {/* Redirect to home if no match */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

const AppWrapper = () => (
  <AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>
);

export default AppWrapper;
