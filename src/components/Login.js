import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as ReactHooks from 'react';

const { useState, useEffect } = ReactHooks;

// Mock user data - in a real app, this would come from a backend
const MOCK_USERS = [
  { username: 'it_head', password: 'password321', department: 'IT' },
  { username: 'hr_head', password: 'password321', department: 'HR' },
  { username: 'marketing_head', password: 'password321', department: 'Marketing' }
];

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Check for success message from registration
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the state to avoid showing the message again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Load saved credentials if available
  useEffect(() => {
    const savedCredentials = localStorage.getItem('rememberedCredentials');
    if (savedCredentials) {
      try {
        const { username, password, rememberMe } = JSON.parse(savedCredentials);
        // Only autofill if username and password exist
        if (username && password) {
          setFormData({ username, password });
          setRememberMe(rememberMe);
        }
      } catch (error) {
        // If there's an error parsing the saved credentials, remove them
        localStorage.removeItem('rememberedCredentials');
        console.error('Error loading saved credentials:', error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setError('');
    setSuccessMessage('');

    // Validate that fields are not empty
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Username and password cannot be empty');
      return;
    }

    const user = MOCK_USERS.find(
      u => u.username === formData.username && u.password === formData.password
    );

    if (user) {
      // Handle remember me
      if (rememberMe) {
        localStorage.setItem('rememberedCredentials', JSON.stringify({
          username: formData.username,
          password: formData.password,
          rememberMe: true
        }));
      } else {
        localStorage.removeItem('rememberedCredentials');
      }

      // Store user info in localStorage (in a real app, you'd store a token)
      localStorage.setItem('user', JSON.stringify({
        username: user.username,
        department: user.department
      }));
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const clearRememberedCredentials = () => {
    localStorage.removeItem('rememberedCredentials');
    setRememberMe(false);
    setFormData({
      username: '',
      password: ''
    });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Login to your account</h1>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="form-label">e-mail</label>
            <div className="input-with-icon">
              <span className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </span>
              <input
                type="text"
                className="input-field"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Your e-mail"
                autoComplete="username"
              />
            </div>
          </div>
          <div className="input-group">
            <label className="form-label">Password</label>
            <div className="input-with-icon">
              <span className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="input-field"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Your password"
                autoComplete="current-password"
              />
              <button 
                type="button" 
                className="password-toggle" 
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="action-buttons">
            <button type="button" className="register-button" onClick={handleRegisterClick}>Register</button>
            <button type="submit" className="login-button">Login</button>
          </div>
          
          <div className="login-footer">
            <label className="remember-me">
              <input 
                type="checkbox" 
                className="remember-checkbox" 
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              Remember me
            </label>
            <div className="right-links">
              {formData.username && rememberMe && (
                <button 
                  type="button" 
                  className="clear-credentials-button" 
                  onClick={clearRememberedCredentials}
                >
                  Clear saved login
                </button>
              )}
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login; 