import { UserService } from '../service/userService';
import { SubscriptionService } from '../service/subscriptionService';

const AdminPage = ({ users, subscriptions, currentUser, isAdmin }) => {
  
    if (!isAdmin()) {
      return (
        <div className="admin-page">
          <div className="container">
            <div className="access-denied">
              <Shield className="access-icon" />
              <h2 className="access-title">Admin Access Required</h2>
              <p className="access-message">
                This page is only accessible to administrators.
              </p>
            </div>
          </div>
        </div>
      );
    }
  
    const userStats = UserService.getUserStats(users);
    const subscriptionStats = SubscriptionService.getSubscriptionStats(subscriptions);
  
    return (
      <div className="admin-page">
        <div className="container">
          <div className="page-header">
            <h2 className="page-title">Admin Dashboard</h2>
            <p className="page-description">Manage users and subscriptions</p>
            <div className="admin-badge">
              <Shield className="badge-icon" />
              <span>Admin Access: {currentUser.fullName}</span>
            </div>
          </div>
  
          <div className="admin-grid">
            
            {/* Users Management */}
            <div className="admin-card">
              <div className="card-header">
                <Users className="card-icon" />
                <h3 className="card-title">Users Management</h3>
              </div>
              
              <div className="users-table">
                <div className="table-header">
                  <span>Name</span>
                  <span>Email</span>
                  <span>Role</span>
                </div>
                
                {users.map((user) => (
                  <div key={user.id} className="table-row">
                    <span className="user-name">{user.fullName}</span>
                    <span className="user-email">{user.email}</span>
                    <span className={`user-role ${user.role}`}>
                      {user.role}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="stats-box">
                <h4 className="stats-title">Statistics</h4>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-label">Total Users:</span>
                    <span className="stat-value total">{userStats.total}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Admins:</span>
                    <span className="stat-value admin">{userStats.admins}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Regular Users:</span>
                    <span className="stat-value user">{userStats.users}</span>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Subscriptions Management */}
            <div className="admin-card">
              <div className="card-header">
                <Utensils className="card-icon" />
                <h3 className="card-title">Subscriptions Management</h3>
              </div>
              
              <div className="subscriptions-list">
                {subscriptions.length === 0 ? (
                  <p className="no-data">No subscriptions yet</p>
                ) : (
                  subscriptions.map((subscription) => (
                    <div key={subscription.id} className="subscription-item">
                      <div className="subscription-header">
                        <h4 className="subscription-plan">{subscription.planName}</h4>
                        <span className={`subscription-status ${subscription.status.toLowerCase()}`}>
                          {subscription.status}
                        </span>
                      </div>
                      <div className="subscription-details">
                        <p><strong>User:</strong> {subscription.name} ({subscription.userEmail || 'N/A'})</p>
                        <p><strong>Phone:</strong> {subscription.phone}</p>
                        <p><strong>Price:</strong> {SubscriptionService.formatPrice(subscription.totalPrice)}/month</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="stats-box">
                <h4 className="stats-title">Statistics</h4>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-label">Total Subscriptions:</span>
                    <span className="stat-value total">{subscriptionStats.total}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Active Subscriptions:</span>
                    <span className="stat-value active">{subscriptionStats.active}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Monthly Revenue:</span>
                    <span className="stat-value revenue">
                      {SubscriptionService.formatPrice(subscriptionStats.monthlyRevenue)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/* Security Information */}
          <div className="security-card">
            <div className="card-header">
              <Shield className="card-icon" />
              <h3 className="card-title">Security Information</h3>
            </div>
            
            <div className="security-grid">
              <div className="security-item xss">
                <h4 className="security-title">✅ XSS Protection</h4>
                <p className="security-description">All user inputs are sanitized to prevent cross-site scripting attacks.</p>
              </div>
              
              <div className="security-item password">
                <h4 className="security-title">🔒 Password Security</h4>
                <p className="security-description">Passwords are hashed and meet strong security requirements.</p>
              </div>
              
              <div className="security-item csrf">
                <h4 className="security-title">🛡️ CSRF Protection</h4>
                <p className="security-description">CSRF tokens protect against cross-site request forgery attacks.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default AdminPage;