import React from 'react';
import './MenuPage.css';

const MenuPage = ({ mealPlans, setSelectedPlan }) => {
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
              <p className="plan-description">{plan.description}</p>
              <button
                onClick={() => setSelectedPlan(plan)}
                className="plan-details-btn"
              >
                See More Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;