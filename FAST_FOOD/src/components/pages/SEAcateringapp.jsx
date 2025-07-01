import React, { useState } from 'react';
import HomePage from './HomePage';
import MenuPage from './MenuPage';
import SubscriptionPage from './SubscriptionPage';
import ContactPage from './ContactPage';
import AdminPage from './AdminPage';
import AuthPage from './AuthPage';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Modal from '../common/Modal';
import { mealPlans, initialTestimonials, initialUsers } from '../data/mockData';
import { generateCSRFToken } from '../utils/security';
import '../styles/common.css';
import '../styles/pages.css';
import '../styles/auth.css';
import '../styles/admin.css';

const SEACateringApp = () => {
  // State management
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [csrfToken] = useState(generateCSRFToken());
  const [users, setUsers] = useState(initialUsers);
  const [subscriptions, setSubscriptions] = useState([]);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [subscriptionForm, setSubscriptionForm] = useState({
    name: '',
    phone: '',
    planType: '',
    mealTypes: [],
    deliveryDays: [],
    allergies: ''
  });

  // Authentication helpers
  const isAuthenticated = () => currentUser !== null;
  const isAdmin = () => currentUser?.role === 'admin';

  // Navigation configuration
  const getNavigation = () => [
    { id: 'home', label: 'Home', protected: false },
    { id: 'menu', label: 'Menu', protected: false },
    { id: 'subscription', label: 'Subscription', protected: true },
    { id: 'contact', label: 'Contact', protected: false },
    { id: 'admin', label: 'Admin', protected: true, adminOnly: true }
  ];

  // Handle logout
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
    alert('You have been logged out successfully.');
  };

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            setCurrentPage={setCurrentPage}
            testimonials={testimonials}
            setTestimonials={setTestimonials}
          />
        );
      case 'menu':
        return (
          <MenuPage 
            mealPlans={mealPlans}
            setSelectedPlan={setSelectedPlan}
            setCurrentPage={setCurrentPage}
            setSubscriptionForm={setSubscriptionForm}
            subscriptionForm={subscriptionForm}
            isAuthenticated={isAuthenticated}
          />
        );
      case 'subscription':
        return (
          <SubscriptionPage 
            mealPlans={mealPlans}
            subscriptions={subscriptions}
            setSubscriptions={setSubscriptions}
            subscriptionForm={subscriptionForm}
            setSubscriptionForm={setSubscriptionForm}
            currentUser={currentUser}
            isAuthenticated={isAuthenticated}
            setCurrentPage={setCurrentPage}
            csrfToken={csrfToken}
          />
        );
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return (
          <AdminPage 
            users={users}
            subscriptions={subscriptions}
            currentUser={currentUser}
            isAdmin={isAdmin}
          />
        );
      case 'auth':
        return (
          <AuthPage 
            users={users}
            setUsers={setUsers}
            setCurrentUser={setCurrentUser}
            setCurrentPage={setCurrentPage}
            csrfToken={csrfToken}
          />
        );
      default:
        return (
          <HomePage 
            setCurrentPage={setCurrentPage}
            testimonials={testimonials}
            setTestimonials={setTestimonials}
          />
        );
    }
  };

  return (
    <>
      <Header 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        currentUser={currentUser}
        handleLogout={handleLogout}
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        getNavigation={getNavigation}
      />
      
      <main className="main-content">
        {renderPage()}
      </main>
      
      <Footer />
      
      {selectedPlan && (
        <Modal 
          plan={selectedPlan} 
          onClose={() => setSelectedPlan(null)} 
        />
      )}
    </>
  );
};

export default SEACateringApp;