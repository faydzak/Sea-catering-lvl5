import React, { useState } from 'react';
import { Utensils } from 'lucide-react';
import HomePage from './HomePage';
import MenuPage from './MenuPage';
import SubscriptionPage from './SubscriptionPage';
import ContactPage from './ContactPage';
import Modal from './Modal';
import './SEACateringApp.css';

// Mock data for meal plans
const mealPlans = [
  {
    id: 1,
    name: "Diet Plan",
    price: "Rp30.000",
    description: "Perfect for weight management and healthy living",
    image: "🥗",
    details: "Our Diet Plan includes carefully portioned meals with lean proteins, fresh vegetables, and whole grains. Each meal is designed to keep you satisfied while supporting your weight management goals.",
    features: ["Low calorie", "High protein", "Fresh vegetables", "Portion controlled"]
  },
  {
    id: 2,
    name: "Protein Plan",
    price: "Rp40.000",
    description: "High-protein meals for active individuals",
    image: "🍗",
    details: "The Protein Plan is designed for athletes and fitness enthusiasts. Each meal contains premium protein sources, complex carbohydrates, and essential nutrients to fuel your active lifestyle.",
    features: ["High protein content", "Post-workout recovery", "Muscle building", "Energy sustaining"]
  },
  {
    id: 3,
    name: "Royal Plan",
    price: "Rp60.000",
    description: "Premium gourmet meals with finest ingredients",
    image: "👑",
    details: "Experience luxury dining with our Royal Plan. Each meal features premium ingredients, gourmet preparation, and restaurant-quality presentation delivered to your door.",
    features: ["Premium ingredients", "Gourmet preparation", "Restaurant quality", "Luxury experience"]
  }
];

// Mock testimonials data
const initialTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    message: "SEA Catering has transformed my eating habits. The meals are delicious and perfectly portioned!",
    rating: 5
  },
  {
    id: 2,
    name: "Ahmad Rahman",
    message: "Excellent service and fresh ingredients. I love the variety in their meal plans.",
    rating: 5
  },
  {
    id: 3,
    name: "Maria Santos",
    message: "The Royal Plan is absolutely amazing. Restaurant-quality meals delivered to my home!",
    rating: 5
  }
];

const SEACateringApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [testimonials, setTestimonials] = useState(initialTestimonials);

  const navigation = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu / Meal Plans' },
    { id: 'subscription', label: 'Subscription' },
    { id: 'contact', label: 'Contact Us' }
  ];

  // Header Component
  const Header = () => (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo" onClick={() => setCurrentPage('home')}>
            <Utensils className="logo-icon" />
            <h1>SEA Catering</h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="nav">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <div className="mobile-nav">
            <select 
              value={currentPage} 
              onChange={(e) => setCurrentPage(e.target.value)}
              className="mobile-select"
            >
              {navigation.map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );

  // Footer Component
  const Footer = () => (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <Utensils className="footer-icon" />
            <h4>SEA Catering</h4>
          </div>
          <p className="footer-slogan">"Healthy Meals, Anytime, Anywhere"</p>
          <p className="footer-description">
            Thank you for choosing SEA Catering. We're committed to providing you with the best 
            healthy meal experience across Indonesia.
          </p>
          <div className="footer-divider">
            <p className="footer-copyright">&copy; 2025 SEA Catering. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );

  // Page renderer
  const renderPage = () => {
    switch(currentPage) {
      case 'home': 
        return <HomePage setCurrentPage={setCurrentPage} testimonials={testimonials} setTestimonials={setTestimonials} />;
      case 'menu': 
        return <MenuPage mealPlans={mealPlans} setSelectedPlan={setSelectedPlan} />;
      case 'subscription': 
        return <SubscriptionPage />;
      case 'contact': 
        return <ContactPage />;
      default: 
        return <HomePage setCurrentPage={setCurrentPage} testimonials={testimonials} setTestimonials={setTestimonials} />;
    }
  };

  return (
    <div className="app">
      <Header />
      {renderPage()}
      <Footer />
      {selectedPlan && (
        <Modal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </div>
  );
};

export default SEACateringApp;