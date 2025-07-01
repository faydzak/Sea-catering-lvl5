import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { SubscriptionService } from '../service/subscriptionService';
import { validateSubscriptionForm } from '../utils/validation';
import { MEAL_TYPE_OPTIONS, DELIVERY_DAY_OPTIONS } from '../utils/constants';

const SubscriptionPage = ({ 
  mealPlans, 
  subscriptions, 
  setSubscriptions, 
  subscriptionForm, 
  setSubscriptionForm, 
  currentUser, 
  isAuthenticated, 
  setCurrentPage,
  csrfToken
}) => {
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Check authentication
  if (!isAuthenticated()) {
    return (
      <div className="subscription-page">
        <div className="container">
          <div className="auth-required">
            <Lock className="auth-icon" />
            <h2 className="auth-title">Authentication Required</h2>
            <p className="auth-message">
              Please log in to access the subscription system and manage your meal plans.
            </p>
            <button 
              onClick={() => setCurrentPage('auth')}
              className="auth-button"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate subscription price
  const calculatePrice = () => {
    if (!subscriptionForm.planType || subscriptionForm.mealTypes.length === 0 || subscriptionForm.deliveryDays.length === 0) {
      return 0;
    }
    
    const selectedPlan = mealPlans.find(plan => plan.id.toString() === subscriptionForm.planType);
    if (!selectedPlan) return 0;

    return SubscriptionService.calculatePrice(selectedPlan.priceValue, subscriptionForm.mealTypes, subscriptionForm.deliveryDays);
  };

  // Handle meal type selection
  const handleMealTypeChange = (mealTypeId) => {
    setSubscriptionForm(prev => ({
      ...prev,
      mealTypes: prev.mealTypes.includes(mealTypeId)
        ? prev.mealTypes.filter(id => id !== mealTypeId)
        : [...prev.mealTypes, mealTypeId]
    }));
  };

  // Handle delivery day selection
  const handleDeliveryDayChange = (dayId) => {
    setSubscriptionForm(prev => ({
      ...prev,
      deliveryDays: prev.deliveryDays.includes(dayId)
        ? prev.deliveryDays.filter(id => id !== dayId)
        : [...prev.deliveryDays, dayId]
    }));
  };

  // Handle subscription form submission
  const handleSubscriptionSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateSubscriptionForm(subscriptionForm);
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      const newSubscription = SubscriptionService.createSubscription(
        subscriptionForm, 
        currentUser, 
        mealPlans, 
        csrfToken
      );
      
      setSubscriptions(prev => [...prev, newSubscription]);
      
      // Reset form
      setSubscriptionForm({
        name: '',
        phone: '',
        planType: '',
        mealTypes: [],
        deliveryDays: [],
        allergies: ''
      });
      
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
  };

  return (
    <div className="subscription-page">
      <div className="container">
        <div className="page-header">
          <h2 className="page-title">Subscribe to SEA Catering</h2>
          <p className="page-description">Choose your perfect meal plan and customize your delivery schedule</p>
          <div className="user-info">
            <p className="logged-in-as">
              🔒 Logged in as: <strong>{currentUser.fullName}</strong> ({currentUser.email})
            </p>
          </div>
        </div>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="success-message">
            <p className="success-title">🎉 Subscription Created Successfully!</p>
            <p>Thank you for subscribing to SEA Catering. We'll contact you soon to confirm your order.</p>
          </div>
        )}

        <div className="subscription-form-container">
          <form onSubmit={handleSubscriptionSubmit} className="subscription-form">
            
            {/* CSRF Token (Hidden) */}
            <input type="hidden" value={csrfToken} />
            
            {/* Name Field */}
            <div className="form-group">
              <label className="form-label">
                Full Name <span className="required">*</span>
              </label>
              <input
                type="text"
                value={subscriptionForm.name}
                onChange={(e) => setSubscriptionForm({...subscriptionForm, name: e.target.value})}
                className={`form-input ${formErrors.name ? 'error' : ''}`}
                placeholder="Enter your full name"
              />
              {formErrors.name && <p className="error-message">{formErrors.name}</p>}
            </div>

            {/* Phone Field */}
            <div className="form-group">
              <label className="form-label">
                Active Phone Number <span className="required">*</span>
              </label>
              <input
                type="tel"
                value={subscriptionForm.phone}
                onChange={(e) => setSubscriptionForm({...subscriptionForm, phone: e.target.value})}
                className={`form-input ${formErrors.phone ? 'error' : ''}`}
                placeholder="08123456789"
              />
              {formErrors.phone && <p className="error-message">{formErrors.phone}</p>}
            </div>

            {/* Plan Selection */}
            <div className="form-group">
              <label className="form-label">
                Select Meal Plan <span className="required">*</span>
              </label>
              <div className="plan-selection-grid">
                {mealPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`plan-option ${subscriptionForm.planType === plan.id.toString() ? 'selected' : ''}`}
                    onClick={() => setSubscriptionForm({...subscriptionForm, planType: plan.id.toString()})}
                  >
                    <div className="plan-option-image">{plan.image}</div>
                    <h4 className="plan-option-name">{plan.name}</h4>
                    <p className="plan-option-price">{plan.price}</p>
                    <p className="plan-option-description">{plan.description}</p>
                  </div>
                ))}
              </div>
              {formErrors.planType && <p className="error-message">{formErrors.planType}</p>}
            </div>

            {/* Meal Types */}
            <div className="form-group">
              <label className="form-label">
                Select Meal Types <span className="required">*</span>
                <span className="form-hint">(Select at least one)</span>
              </label>
              <div className="checkbox-grid">
                {MEAL_TYPE_OPTIONS.map((mealType) => (
                  <label
                    key={mealType.id}
                    className={`checkbox-option ${subscriptionForm.mealTypes.includes(mealType.id) ? 'selected' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={subscriptionForm.mealTypes.includes(mealType.id)}
                      onChange={() => handleMealTypeChange(mealType.id)}
                      className="checkbox-input"
                    />
                    <span className="checkbox-label">{mealType.label}</span>
                  </label>
                ))}
              </div>
              {formErrors.mealTypes && <p className="error-message">{formErrors.mealTypes}</p>}
            </div>

            {/* Delivery Days */}
            <div className="form-group">
              <label className="form-label">
                Select Delivery Days <span className="required">*</span>
                <span className="form-hint">(Select any combination)</span>
              </label>
              <div className="day-selection-grid">
                {DELIVERY_DAY_OPTIONS.map((day) => (
                  <label
                    key={day.id}
                    className={`day-option ${subscriptionForm.deliveryDays.includes(day.id) ? 'selected' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={subscriptionForm.deliveryDays.includes(day.id)}
                      onChange={() => handleDeliveryDayChange(day.id)}
                      className="day-input"
                    />
                    <span className="day-label">{day.label}</span>
                  </label>
                ))}
              </div>
              {formErrors.deliveryDays && <p className="error-message">{formErrors.deliveryDays}</p>}
            </div>

            {/* Allergies */}
            <div className="form-group">
              <label className="form-label">
                Allergies & Dietary Restrictions
                <span className="form-hint">(Optional)</span>
              </label>
              <textarea
                value={subscriptionForm.allergies}
                onChange={(e) => setSubscriptionForm({...subscriptionForm, allergies: e.target.value})}
                className="form-textarea"
                placeholder="Please list any allergies or dietary restrictions..."
              />
            </div>

            {/* Price Calculation */}
            <div className="price-summary">
              <h3 className="summary-title">Subscription Summary</h3>
              
              {subscriptionForm.planType && subscriptionForm.mealTypes.length > 0 && subscriptionForm.deliveryDays.length > 0 ? (
                <div className="price-breakdown">
                  <div className="price-row">
                    <span>Selected Plan:</span>
                    <span className="price-value">
                      {mealPlans.find(p => p.id.toString() === subscriptionForm.planType)?.name}
                    </span>
                  </div>
                  <div className="price-row">
                    <span>Plan Price per meal:</span>
                    <span className="price-value">
                      {mealPlans.find(p => p.id.toString() === subscriptionForm.planType)?.price}
                    </span>
                  </div>
                  <div className="price-row">
                    <span>Meal Types:</span>
                    <span className="price-value">{subscriptionForm.mealTypes.length} meals/day</span>
                  </div>
                  <div className="price-row">
                    <span>Delivery Days:</span>
                    <span className="price-value">{subscriptionForm.deliveryDays.length} days/week</span>
                  </div>
                  <div className="price-row">
                    <span>Monthly Multiplier:</span>
                    <span className="price-value">4.3 weeks</span>
                  </div>
                  <div className="price-divider"></div>
                  <div className="price-row total">
                    <span className="total-label">Total Monthly Price:</span>
                    <span className="total-value">{SubscriptionService.formatPrice(calculatePrice())}</span>
                  </div>
                </div>
              ) : (
                <p className="price-placeholder">Complete the form above to see your subscription price</p>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-button">
              Subscribe Now
            </button>
          </form>
        </div>

        {/* Current User's Subscriptions */}
        {SubscriptionService.getUserSubscriptions(currentUser.id, subscriptions).length > 0 && (
          <div className="subscriptions-list">
            <h3 className="list-title">Your Subscriptions</h3>
            <div className="subscriptions-grid">
              {SubscriptionService.getUserSubscriptions(currentUser.id, subscriptions).map((subscription) => (
                <div key={subscription.id} className="subscription-card">
                  <div className="subscription-header">
                    <h4 className="subscription-plan">{subscription.planName}</h4>
                    <span className="subscription-status active">{subscription.status}</span>
                  </div>
                  
                  <div className="subscription-details">
                    <div className="detail-group">
                      <p className="detail-label">Name:</p>
                      <p className="detail-value">{subscription.name}</p>
                    </div>
                    <div className="detail-group">
                      <p className="detail-label">Phone:</p>
                      <p className="detail-value">{subscription.phone}</p>
                    </div>
                    <div className="detail-group">
                      <p className="detail-label">Meal Types:</p>
                      <p className="detail-value">{subscription.mealTypeLabels.join(', ')}</p>
                    </div>
                    <div className="detail-group">
                      <p className="detail-label">Delivery Days:</p>
                      <p className="detail-value">{subscription.deliveryDayLabels.join(', ')}</p>
                    </div>
                    <div className="detail-group">
                      <p className="detail-label">Monthly Price:</p>
                      <p className="detail-price">{SubscriptionService.formatPrice(subscription.totalPrice)}</p>
                    </div>
                  </div>
                  
                  {subscription.allergies && (
                    <div className="subscription-allergies">
                      <p className="detail-label">Allergies:</p>
                      <p className="detail-value">{subscription.allergies}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;