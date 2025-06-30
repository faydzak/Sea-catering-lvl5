import React, { useState } from 'react';
import { Lock, User, Mail, Eye, EyeOff } from 'lucide-react';
import { AuthService } from '../../services/authService';
import { validateAuthForm } from '../../utils/validation';

const AuthPage = ({ 
  users, 
  setUsers, 
  setCurrentUser, 
  setCurrentPage, 
  csrfToken 
}) => {
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [authErrors, setAuthErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Handle user registration
  const handleRegister = (e) => {
    e.preventDefault();
    
    const errors = validateAuthForm(authForm, authMode);
    setAuthErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      // Check if user already exists
      if (AuthService.userExists(authForm.email, users)) {
        setAuthErrors({ email: 'User with this email already exists' });
        return;
      }
      
      // Create new user
      const newUser = AuthService.createUser(authForm);
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(AuthService.createSession(newUser));
      setAuthForm({ fullName: '', email: '', password: '', confirmPassword: '' });
      setCurrentPage('home');
      alert('Registration successful! Welcome to SEA Catering.');
    }
  };

  // Handle user login
  const handleLogin = (e) => {
    e.preventDefault();
    
    const errors = validateAuthForm(authForm, authMode);
    setAuthErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      const user = AuthService.verifyLogin(authForm.email, authForm.password, users);
      
      if (user) {
        setCurrentUser(AuthService.createSession(user));
        setAuthForm({ fullName: '', email: '', password: '', confirmPassword: '' });
        setCurrentPage('home');
        alert(`Welcome back, ${user.fullName}!`);
      } else {
        setAuthErrors({ email: 'Invalid email or password' });
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          
          {/* Auth Mode Toggle */}
          <div className="auth-toggle">
            <button
              onClick={() => {
                setAuthMode('login');
                setAuthErrors({});
                setAuthForm({ fullName: '', email: '', password: '', confirmPassword: '' });
              }}
              className={`toggle-btn ${authMode === 'login' ? 'active' : ''}`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setAuthMode('register');
                setAuthErrors({});
                setAuthForm({ fullName: '', email: '', password: '', confirmPassword: '' });
              }}
              className={`toggle-btn ${authMode === 'register' ? 'active' : ''}`}
            >
              Register
            </button>
          </div>

          <div className="auth-header">
            <h2 className="auth-title">
              {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="auth-description">
              {authMode === 'login' 
                ? 'Sign in to manage your subscriptions' 
                : 'Join SEA Catering to start your healthy journey'
              }
            </p>
          </div>

          <form onSubmit={authMode === 'login' ? handleLogin : handleRegister} className="auth-form">
            
            {/* CSRF Token (Hidden) */}
            <input type="hidden" value={csrfToken} />
            
            {/* Full Name (Register only) */}
            {authMode === 'register' && (
              <div className="form-group">
                <label className="form-label">
                  Full Name <span className="required">*</span>
                </label>
                <div className="input-container">
                  <User className="input-icon" />
                  <input
                    type="text"
                    value={authForm.fullName}
                    onChange={(e) => setAuthForm({...authForm, fullName: e.target.value})}
                    className={`form-input ${authErrors.fullName ? 'error' : ''}`}
                    placeholder="Enter your full name"
                  />
                </div>
                {authErrors.fullName && <p className="error-message">{authErrors.fullName}</p>}
              </div>
            )}

            {/* Email */}
            <div className="form-group">
              <label className="form-label">
                Email <span className="required">*</span>
              </label>
              <div className="input-container">
                <Mail className="input-icon" />
                <input
                  type="email"
                  value={authForm.email}
                  onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                  className={`form-input ${authErrors.email ? 'error' : ''}`}
                  placeholder="Enter your email"
                />
              </div>
              {authErrors.email && <p className="error-message">{authErrors.email}</p>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">
                Password <span className="required">*</span>
              </label>
              <div className="input-container">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={authForm.password}
                  onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                  className={`form-input ${authErrors.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {authErrors.password && <p className="error-message">{authErrors.password}</p>}
            </div>

            {/* Confirm Password (Register only) */}
            {authMode === 'register' && (
              <div className="form-group">
                <label className="form-label">
                  Confirm Password <span className="required">*</span>
                </label>
                <div className="input-container">
                  <Lock className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={authForm.confirmPassword}
                    onChange={(e) => setAuthForm({...authForm, confirmPassword: e.target.value})}
                    className={`form-input ${authErrors.confirmPassword ? 'error' : ''}`}
                    placeholder="Confirm your password"
                  />
                </div>
                {authErrors.confirmPassword && <p className="error-message">{authErrors.confirmPassword}</p>}
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" className="auth-submit">
              {authMode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="demo-accounts">
            <h4 className="demo-title">Demo Accounts:</h4>
            <div className="demo-info">
              <p><strong>Admin:</strong> admin@seacatering.com / AdminPass123!</p>
              <p className="demo-note">Create your own account or use admin for testing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;