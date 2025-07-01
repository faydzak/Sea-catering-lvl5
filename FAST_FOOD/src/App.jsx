import React, { useState, useEffect } from 'react';
import HomePage from './components/pages/HomePage';
import MenuPage from './components/pages/MenuPage';
import SubscriptionPage from './components/pages/SubscriptionPage';
import UserDashboard from './components/pages/UserDashboard';
import ContactPage from './components/pages/ContactPage';
import AuthPage from './components/pages/AuthPage';
import AdminPage from './components/pages/AdminPage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { AuthService } from './components/service/authService';
import { UserService } from './components/service/userService';
import { SubscriptionService } from './components/service/subscriptionService';
import mockData from './components/data/mockData';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState(mockData.users);
  const [subscriptions, setSubscriptions] = useState(mockData.subscriptions);
  const [mealPlans, setMealPlans] = useState(mockData.mealPlans);
  const [testimonials, setTestimonials] = useState(mockData.testimonials);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [subscriptionForm, setSubscriptionForm] = useState({
    planId: '',
    userId: '',
    startDate: '',
    endDate: '',
    status: 'Active',
    totalPrice: 0,
    mealType: [],
    deliveryDay: []
  });
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    // Simulate fetching CSRF token
    setCsrfToken('mock-csrf-token');

    // Simulate user authentication status on load
    const storedUser = AuthService.getCurrentUser();
    if (storedUser) {
      setCurrentUser(storedUser);
      setIsAuthenticated(true);
      setIsAdmin(storedUser.role === 'admin');
    }
  }, []);

  const handleLogin = (user) => {
    AuthService.login(user);
    setCurrentUser(user);
    setIsAuthenticated(true);
    setIsAdmin(user.role === 'admin');
    setCurrentPage('dashboard'); // Redirect to dashboard after login
  };

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    setCurrentPage('home'); // Redirect to home after logout
  };

  const navigation = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu / Meal Plans' },
    { id: 'subscription', label: 'Subscription', protected: true },
    { id: 'dashboard', label: 'My Dashboard', protected: true },
    { id: 'contact', label: 'Contact Us' }
  ];

  const renderPage = () => {
    const commonProps = {
      setCurrentPage,
      mealPlans,
      testimonials,
      setTestimonials,
      currentUser,
      isAuthenticated,
      isAdmin: () => isAdmin // Pass isAdmin as a function
    };

    switch(currentPage) {
      case 'home': 
        return <HomePage {...commonProps} />;
      case 'menu': 
        return <MenuPage 
          {...commonProps}
          setSelectedPlan={setSelectedPlan}
          subscriptionForm={subscriptionForm}
          setSubscriptionForm={setSubscriptionForm}
        />;
      case 'subscription': 
        return <SubscriptionPage 
          {...commonProps}
          subscriptions={subscriptions}
          setSubscriptions={setSubscriptions}
          subscriptionForm={subscriptionForm}
          setSubscriptionForm={setSubscriptionForm}
          csrfToken={csrfToken}
        />;
      case 'dashboard': 
        return <UserDashboard 
          {...commonProps}
          subscriptions={subscriptions}
          setSubscriptions={setSubscriptions}
        />;
      case 'contact': 
        return <ContactPage {...commonProps} />;
      case 'auth': 
        return <AuthPage 
          {...commonProps}
          users={users}
          setUsers={setUsers}
          setCurrentUser={handleLogin} // Use handleLogin for setting current user after auth
          csrfToken={csrfToken}
        />;
      case 'admin': 
        return <AdminPage 
          {...commonProps}
          users={users}
          subscriptions={subscriptions}
        />;
      default: 
        return <HomePage {...commonProps} />;
    }
  };

  return (
    <div className="app-container">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        navigation={navigation}
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
        isAdmin={isAdmin}
        handleLogout={handleLogout}
      />
      <main className="main-content">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
