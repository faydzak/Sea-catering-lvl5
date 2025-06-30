import { sanitizeInput } from '../utils/security';
import { MEAL_TYPE_OPTIONS, DELIVERY_DAY_OPTIONS } from '../utils/constants';

export class SubscriptionService {
  // Calculate subscription price
  static calculatePrice(planPrice, mealTypes, deliveryDays) {
    return planPrice * mealTypes.length * deliveryDays.length * 4.3;
  }

  // Format price to Indonesian Rupiah
  static formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  }

  // Create new subscription
  static createSubscription(formData, currentUser, mealPlans, csrfToken) {
    const selectedPlan = mealPlans.find(plan => plan.id.toString() === formData.planType);
    const totalPrice = this.calculatePrice(selectedPlan.priceValue, formData.mealTypes, formData.deliveryDays);
    
    return {
      id: Date.now(),
      userId: currentUser.id,
      userEmail: currentUser.email,
      name: sanitizeInput(formData.name),
      phone: sanitizeInput(formData.phone),
      planType: formData.planType,
      planName: selectedPlan.name,
      mealTypes: formData.mealTypes,
      deliveryDays: formData.deliveryDays,
      allergies: sanitizeInput(formData.allergies),
      totalPrice: totalPrice,
      status: 'Active',
      createdAt: new Date().toISOString(),
      csrfToken: csrfToken,
      mealTypeLabels: formData.mealTypes.map(id => 
        MEAL_TYPE_OPTIONS.find(option => option.id === id)?.label
      ),
      deliveryDayLabels: formData.deliveryDays.map(id => 
        DELIVERY_DAY_OPTIONS.find(option => option.id === id)?.label
      )
    };
  }

  // Get subscription statistics
  static getSubscriptionStats(subscriptions) {
    const active = subscriptions.filter(s => s.status === 'Active');
    const totalRevenue = active.reduce((sum, sub) => sum + sub.totalPrice, 0);
    
    return {
      total: subscriptions.length,
      active: active.length,
      paused: subscriptions.filter(s => s.status === 'Paused').length,
      cancelled: subscriptions.filter(s => s.status === 'Cancelled').length,
      monthlyRevenue: totalRevenue
    };
  }

  // Get user's subscriptions
  static getUserSubscriptions(userId, subscriptions) {
    return subscriptions.filter(sub => sub.userId === userId);
  }
}