export const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;
    
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .trim();
  };
  
  // Simulate password hashing (in real app, use bcrypt on server)
  export const hashPassword = (password) => {
    return btoa(password + 'salt_key_sea_catering')
      .replace(/[^a-zA-Z0-9]/g, '')
      .substring(0, 20);
  };
  
  // Generate CSRF token
  export const generateCSRFToken = () => {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  };
  
  // Verify password against hash
  export const verifyPassword = (inputPassword, hashedPassword) => {
    return hashPassword(inputPassword) === hashedPassword;
  };