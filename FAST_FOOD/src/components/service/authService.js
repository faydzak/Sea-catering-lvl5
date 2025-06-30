
import { hashPassword, verifyPassword, sanitizeInput } from '../utils/security';

export class AuthService {
  // Create new user
  static createUser(userData) {
    return {
      id: Date.now(),
      fullName: sanitizeInput(userData.fullName),
      email: sanitizeInput(userData.email.toLowerCase()),
      password: hashPassword(userData.password),
      role: 'user',
      createdAt: new Date().toISOString()
    };
  }

  // Create user session
  static createSession(user) {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      loginTime: new Date().toISOString()
    };
  }

  // Verify login credentials
  static verifyLogin(email, password, users) {
    const user = users.find(user => 
      user.email.toLowerCase() === email.toLowerCase() &&
      verifyPassword(password, user.password)
    );
    return user;
  }

  // Check if user exists
  static userExists(email, users) {
    return users.find(user => user.email.toLowerCase() === email.toLowerCase());
  }
}