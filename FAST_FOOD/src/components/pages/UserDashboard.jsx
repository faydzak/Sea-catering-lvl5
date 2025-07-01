import React, { useState } from 'react';
import { Calendar, Pause, X, AlertTriangle } from 'lucide-react';
import { SubscriptionService } from '../service/subscriptionService';

const UserDashboard = ({ 
  subscriptions, 
  setSubscriptions, 
  currentUser, 
  setCurrentPage 
}) => {
  const [showPauseModal, setShowPauseModal] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(null);
  const [pauseForm, setPauseForm] = useState({
    startDate: '',
    endDate: ''
  });

  // Get user's subscriptions
  const userSubscriptions = SubscriptionService.getUserSubscriptions(currentUser.id, subscriptions);

  // Handle pause subscription
  const handlePauseSubscription = (subscriptionId) => {
    if (!pauseForm.startDate || !pauseForm.endDate) {
      alert('Please select both start and end dates');
      return;
    }

    if (new Date(pauseForm.startDate) >= new Date(pauseForm.endDate)) {
      alert('End date must be after start date');
      return;
    }

    setSubscriptions(prev => prev.map(sub => 
      sub.id === subscriptionId 
        ? { 
            ...sub, 
            status: 'Paused',
            pauseStart: pauseForm.startDate,
            pauseEnd: pauseForm.endDate,
            pausedAt: new Date().toISOString()
          }
        : sub
    ));

    setShowPauseModal(null);
    setPauseForm({ startDate: '', endDate: '' });
    alert('Subscription paused successfully!');
  };

  // Handle cancel subscription
  const handleCancelSubscription = (subscriptionId) => {
    setSubscriptions(prev => prev.map(sub => 
      sub.id === subscriptionId 
        ? { 
            ...sub, 
            status: 'Cancelled',
            cancelledAt: new Date().toISOString()
          }
        : sub
    ));

    setShowCancelModal(null);
    alert('Subscription cancelled successfully!');
  };

  // Handle reactivate subscription
  const handleReactivateSubscription = (subscriptionId) => {
    setSubscriptions(prev => prev.map(sub => 
      sub.id === subscriptionId 
        ? { 
            ...sub, 
            status: 'Active',
            reactivatedAt: new Date().toISOString(),
            pauseStart: null,
            pauseEnd: null
          }
        : sub
    ));
    alert('Subscription reactivated successfully!');
  };

  return (
    <div className="user-dashboard">
      <div className="container">
        <div className="page-header">
          <h2 className="page-title">My Dashboard</h2>
          <p className="page-description">Manage your meal subscriptions</p>
          <div className="user-info">
            <p className="logged-in-as">
              👤 Welcome, <strong>{currentUser.fullName}</strong>
            </p>
          </div>
        </div>

        {userSubscriptions.length === 0 ? (
          <div className="no-subscriptions">
            <h3>No Subscriptions Yet</h3>
            <p>You haven't created any subscriptions yet.</p>
            <button 
              onClick={() => setCurrentPage('menu')}
              className="create-subscription-btn"
            >
              Browse Meal Plans
            </button>
          </div>
        ) : (
          <div className="subscriptions-dashboard">
            <h3 className="dashboard-title">Your Active Subscriptions</h3>
            
            <div className="subscriptions-grid">
              {userSubscriptions.map((subscription) => (
                <div key={subscription.id} className="subscription-dashboard-card">
                  <div className="subscription-header">
                    <h4 className="subscription-plan">{subscription.planName}</h4>
                    <span className={`subscription-status ${subscription.status.toLowerCase()}`}>
                      {subscription.status}
                    </span>
                  </div>
                  
                  <div className="subscription-details">
                    <div className="detail-row">
                      <span className="detail-label">Meal Types:</span>
                      <span className="detail-value">{subscription.mealTypeLabels.join(', ')}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Delivery Days:</span>
                      <span className="detail-value">{subscription.deliveryDayLabels.join(', ')}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Monthly Price:</span>
                      <span className="detail-price">{SubscriptionService.formatPrice(subscription.totalPrice)}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Created:</span>
                      <span className="detail-value">{new Date(subscription.createdAt).toLocaleDateString()}</span>
                    </div>
                    
                    {subscription.status === 'Paused' && subscription.pauseStart && (
                      <div className="pause-info">
                        <p className="pause-text">
                          Paused from {new Date(subscription.pauseStart).toLocaleDateString()} 
                          to {new Date(subscription.pauseEnd).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="subscription-actions">
                    {subscription.status === 'Active' && (
                      <>
                        <button 
                          onClick={() => setShowPauseModal(subscription.id)}
                          className="action-btn pause-btn"
                        >
                          <Pause className="btn-icon" />
                          Pause
                        </button>
                        <button 
                          onClick={() => setShowCancelModal(subscription.id)}
                          className="action-btn cancel-btn"
                        >
                          <X className="btn-icon" />
                          Cancel
                        </button>
                      </>
                    )}
                    
                    {subscription.status === 'Paused' && (
                      <button 
                        onClick={() => handleReactivateSubscription(subscription.id)}
                        className="action-btn reactivate-btn"
                      >
                        Reactivate
                      </button>
                    )}
                    
                    {subscription.status === 'Cancelled' && (
                      <span className="cancelled-text">Subscription Cancelled</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pause Modal */}
        {showPauseModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">Pause Subscription</h3>
                <button onClick={() => setShowPauseModal(null)} className="modal-close">
                  <X />
                </button>
              </div>
              
              <div className="modal-body">
                <p className="modal-description">
                  Select the date range for pausing your subscription. No charges will be applied during this period.
                </p>
                
                <div className="date-form">
                  <div className="form-group">
                    <label className="form-label">Start Date</label>
                    <input
                      type="date"
                      value={pauseForm.startDate}
                      onChange={(e) => setPauseForm({...pauseForm, startDate: e.target.value})}
                      className="form-input"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">End Date</label>
                    <input
                      type="date"
                      value={pauseForm.endDate}
                      onChange={(e) => setPauseForm({...pauseForm, endDate: e.target.value})}
                      className="form-input"
                      min={pauseForm.startDate || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
                
                <div className="modal-actions">
                  <button 
                    onClick={() => handlePauseSubscription(showPauseModal)}
                    className="confirm-btn"
                  >
                    Confirm Pause
                  </button>
                  <button 
                    onClick={() => setShowPauseModal(null)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cancel Modal */}
        {showCancelModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">Cancel Subscription</h3>
                <button onClick={() => setShowCancelModal(null)} className="modal-close">
                  <X />
                </button>
              </div>
              
              <div className="modal-body">
                <div className="warning-message">
                  <AlertTriangle className="warning-icon" />
                  <p>Are you sure you want to cancel this subscription? This action cannot be undone.</p>
                </div>
                
                <div className="modal-actions">
                  <button 
                    onClick={() => handleCancelSubscription(showCancelModal)}
                    className="confirm-btn danger"
                  >
                    Yes, Cancel Subscription
                  </button>
                  <button 
                    onClick={() => setShowCancelModal(null)}
                    className="cancel-btn"
                  >
                    Keep Subscription
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;