export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Validate password strength
  export const validatePassword = (password) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    const allMet = Object.values(requirements).every(req => req);
    return { requirements, allMet };
  };
  
  // Validate Indonesian phone number
  export const validatePhoneNumber = (phone) => {
    return /^08\d{8,11}$/.test(phone);
  };
  
  // Validate subscription form
  export const validateSubscriptionForm = (form) => {
    const errors = {};
    
    if (!form.name?.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!form.phone?.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!validatePhoneNumber(form.phone)) {
      errors.phone = 'Please enter a valid Indonesian phone number (08xxxxxxxxx)';
    }
    
    if (!form.planType) {
      errors.planType = 'Please select a meal plan';
    }
    
    if (!form.mealTypes || form.mealTypes.length === 0) {
      errors.mealTypes = 'Please select at least one meal type';
    }
    
    if (!form.deliveryDays || form.deliveryDays.length === 0) {
      errors.deliveryDays = 'Please select at least one delivery day';
    }
    
    return errors;
  };
  
  // Validate authentication form
  export const validateAuthForm = (form, mode) => {
    const errors = {};
    
    if (mode === 'register') {
      if (!form.fullName?.trim()) {
        errors.fullName = 'Full name is required';
      } else if (form.fullName.trim().length < 2) {
        errors.fullName = 'Full name must be at least 2 characters';
      }
    }
    
    if (!form.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(form.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!form.password) {
      errors.password = 'Password is required';
    } else if (mode === 'register') {
      const passwordValidation = validatePassword(form.password);
      if (!passwordValidation.allMet) {
        errors.password = 'Password must meet all requirements below';
      }
    }
    
    if (mode === 'register' && form.password !== form.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    return errors;
  };