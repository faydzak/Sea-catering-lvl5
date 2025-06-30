import React from 'react';
import { Utensils, User, Shield, LogOut, Lock } from 'lucide-react';

const Header = ({ 
  currentPage, 
  setCurrentPage, 
  currentUser, 
  handleLogout, 
  isAuthenticated, 
  isAdmin, 
  getNavigation 
}) => (
  <header className="header">
    <div className="container">
      <div className="header-content">
        <div className="logo" onClick={() => setCurrentPage('home')}>
          <Utensils className="logo-icon" />
          <h1>SEA Catering</h1>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="nav">
          {getNavigation().map((item) => {
            // Skip protected routes if not authenticated
            if (item.protected && !isAuthenticated()) return null;
            // Skip admin routes if not admin
            if (item.adminOnly && !isAdmin()) return null;
            
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Authentication Section */}
        <div className="auth-section">
          {isAuthenticated() ? (
            <div className="user-info">
              <div className="user-welcome">
                <User className="user-icon" />
                <span className="welcome-text">Welcome, {currentUser.fullName}</span>
                {isAdmin() && <Shield className="admin-badge" title="Admin" />}
              </div>
              <button onClick={handleLogout} className="logout-btn">
                <LogOut className="logout-icon" />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setCurrentPage('auth')}
              className="login-btn"
            >
              <Lock className="login-icon" />
              Login
            </button>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="mobile-nav">
          <select 
            value={currentPage} 
            onChange={(e) => setCurrentPage(e.target.value)}
            className="mobile-select"
          >
            {getNavigation().map((item) => {
              if (item.protected && !isAuthenticated()) return null;
              if (item.adminOnly && !isAdmin()) return null;
              return (
                <option key={item.id} value={item.id}>{item.label}</option>
              );
            })}
            {!isAuthenticated() && <option value="auth">Login</option>}
          </select>
        </div>
      </div>
    </div>
  </header>
);

export default Header;