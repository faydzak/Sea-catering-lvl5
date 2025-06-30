
export class UserService {
    // Get user statistics
    static getUserStats(users) {
      return {
        total: users.length,
        admins: users.filter(u => u.role === 'admin').length,
        users: users.filter(u => u.role === 'user').length
      };
    }
  
    // Get user by ID
    static getUserById(id, users) {
      return users.find(user => user.id === id);
    }
  
    // Update user role
    static updateUserRole(userId, newRole, users) {
      return users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      );
    }
  }