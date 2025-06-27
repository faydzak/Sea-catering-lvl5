import React from 'react';
import './SubscriptionPage.css';

const SubscriptionPage = () => {
  return (
    <div className="subscription-page">
      <div className="container">
        <div className="page-header">
          <h2 className="page-title">Subscribe to SEA Catering</h2>
          <div className="subscription-placeholder">
            <p className="placeholder-text">
              Ready to start your healthy eating journey? Our subscription system is coming soon!
            </p>
            <p className="placeholder-subtext">
              In the next level, you'll be able to customize your meal plans, select delivery days, 
              and manage your subscription right here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;