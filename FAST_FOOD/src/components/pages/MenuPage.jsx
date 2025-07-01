import React from 'react';
import { SubscriptionService } from '../service/subscriptionService';

const MenuPage = ({ 
  mealPlans, 
  setSelectedPlan, 
  setCurrentPage, 
  setSubscriptionForm, 
  subscriptionForm, 
  isAuthenticated 
}) => {

  const handleSubscribeClick = (plan) => {
    if (!isAuthenticated()) {
      alert('Please log in to subscribe to a meal plan.');
      setCurrentPage('auth');
      return;
    }
    setSubscriptionForm({...subscriptionForm, planType: plan.id.toString()});
    setCurrentPage('subscription');
  };

  return (
    <div className="menu-page">
      <div className="container">
        <div className="page-header">
          <h2 className="page-title">Our Meal Plans</h2>
          <p className="page-description">Choose the perfect plan for your lifestyle</p>
        </div>
        
        <div className="meal-plans-grid">
          {mealPlans.map((plan) => (
            <div key={plan.id} className="meal-plan-card">
              <div className="plan-image">{plan.image}</div>
              <h3 className="plan-name">{plan.name}</h3>
              <p className="plan-price">{plan.price} per meal</p>
              <p className="plan-price-idr">({SubscriptionService.formatPrice(plan.priceValue)} per meal)</p>
              <p className="plan-description">{plan.description}</p>
              <div className="plan-buttons">
                <button
                  onClick={() => setSelectedPlan(plan)}
                  className="plan-details-btn"
                >
                  See More Details
                </button>
                <button
                  onClick={() => handleSubscribeClick(plan)}
                  className="plan-subscribe-btn"
                >
                  {isAuthenticated() ? 'Subscribe Now' : 'Login to Subscribe'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;