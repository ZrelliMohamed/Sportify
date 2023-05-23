
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';
import axios from 'axios';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/admin/login', {
        user_name: username,
        user_password: password,
      });

      // Save the JWT token to local storage or some other secure storage mechanism
      const token = response.data.token;

      // Redirect the user to the admin dashboard
      navigation.navigate('AdminDashboard');
    } catch (error) {
      console.error('Failed to login:', error);
      alert('Invalid username or password');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    
  
    <div class="login-container">
  <div class="description-container">
    <h2>Welcome to Sportify Admin Dashboard</h2>
    <p>Manage your sports-related content with ease!</p>
  </div>
  <div class="admin-section">
    <h1 class="welcome-text">Sportify</h1>
    <h4>Admin Dashboard</h4>
    <label for="username">Admin Username:</label>
    <input
      type="text"
      id="username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required
    />
    <label for="password">Admin Password:</label>
    <div class="password-input-container">
      <input
        type={showPassword ? 'text' : 'password'}
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        class={showPassword ? 'password-input show-password' : 'password-input'}
      />
      {showPassword ? (
        <FaEyeSlash class="password-icon" onClick={togglePasswordVisibility} />
      ) : (
        <FaEye class="password-icon" onClick={togglePasswordVisibility} />
      )}
    </div>
    <button class="login-button" onClick={handleLogin}>
      Login
    </button>
  </div>
</div>

  
  );
}

export default Login;
