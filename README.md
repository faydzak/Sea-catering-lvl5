SEA Catering - React Application
A modern, secure, and responsive meal subscription service built with React and Vite. This application provides a comprehensive platform for customers to subscribe to healthy meal plans and for administrators to manage the service.
🚀 Quick Start
Prerequisites

Node.js 18+
npm or yarn

Installation
bash# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
📁 Project Structure
src/
├── components/
│   ├── common/                 # Reusable components
│   │   ├── Header.jsx         # Navigation header
│   │   ├── Footer.jsx         # Site footer
│   │   └── Modal.jsx          # Modal dialog component
│   ├── pages/                 # Page components
│   │   ├── HomePage.jsx       # Landing page with testimonials
│   │   ├── MenuPage.jsx       # Meal plans display
│   │   ├── SubscriptionPage.jsx # Subscription management
│   │   ├── AuthPage.jsx       # Login/Register
│   │   ├── AdminPage.jsx      # Admin dashboard
│   │   └── SEAcateringapp.jsx # Main app component
│   ├── data/
│   │   └── mockData.js        # Initial data and meal plans
│   ├── services/              # Business logic services
│   │   ├── authService.js     # Authentication logic
│   │   ├── subscriptionService.js # Subscription management
│   │   └── userService.js     # User operations
│   ├── utils/                 # Utility functions
│   │   ├── security.js        # Security utilities
│   │   ├── validation.js      # Form validation
│   │   └── constants.js       # App constants
│   └── styles/                # CSS styling
│       ├── common.css         # Common component styles
│       └── pages.css          # Page-specific styles
├── App.jsx                    # Root component
├── main.jsx                   # Application entry point
└── index.css                  # Global styles
🎯 Features
Core Functionality

User Authentication: Secure login/register with password hashing
Meal Plan Selection: Three tiers (Diet, Protein, Royal)
Flexible Subscriptions: Customizable meal types and delivery days
Price Calculation: Dynamic pricing based on selections
Admin Dashboard: User and subscription management
Testimonial System: Customer review collection

Security Features

Input Sanitization: XSS protection for all user inputs
Password Security: Hashed passwords with salt
CSRF Protection: Token-based request validation
Form Validation: Client-side validation with error handling
Role-based Access: Admin-only routes and features

UI/UX Features

Responsive Design: Mobile-first approach
Dark Theme: Modern dark color scheme
Interactive Components: Hover effects and transitions
Form Feedback: Real-time validation and error messages
Loading States: User feedback during operations

🛠 Component Architecture
Main App Component (SEAcateringapp.jsx)
Central state management and routing logic:
jsxconst [currentPage, setCurrentPage] = useState('home')
const [currentUser, setCurrentUser] = useState(null)
const [users, setUsers] = useState(initialUsers)
const [subscriptions, setSubscriptions] = useState([])
Service Layer
AuthService: Handles user creation, login validation, and session management
javascriptAuthService.createUser(userData)
AuthService.verifyLogin(email, password, users)
AuthService.createSession(user)
SubscriptionService: Manages subscription creation and pricing
javascriptSubscriptionService.calculatePrice(planPrice, mealTypes, deliveryDays)
SubscriptionService.createSubscription(formData, currentUser, mealPlans)
Security Utilities
javascriptsanitizeInput(input)        // XSS protection
hashPassword(password)      // Password hashing
generateCSRFToken()         // CSRF token generation
validateEmail(email)        // Email validation
validatePhoneNumber(phone)  // Indonesian phone validation
📊 Data Models
User Model
javascript{
  id: number,
  fullName: string,
  email: string,
  password: string, // hashed
  role: 'user' | 'admin',
  createdAt: string
}
Subscription Model
javascript{
  id: number,
  userId: number,
  userEmail: string,
  name: string,
  phone: string,
  planType: string,
  planName: string,
  mealTypes: string[],
  deliveryDays: string[],
  allergies: string,
  totalPrice: number,
  status: 'Active' | 'Paused' | 'Cancelled'
}
Meal Plan Model
javascript{
  id: number,
  name: string,
  price: string,
  priceValue: number,
  description: string,
  image: string,
  details: string,
  features: string[]
}
🔐 Authentication System
Demo Accounts

Admin: admin@seacatering.com / AdminPass123!
User Registration: Available through the registration form

Password Requirements

Minimum 8 characters
At least one uppercase letter
At least one lowercase letter
At least one number
At least one special character

Session Management

In-memory session storage
User data persistence during session
Automatic logout functionality

💰 Pricing Logic
The subscription pricing follows this formula:
Total Price = Plan Price × Meal Types × Delivery Days × 4.3 (weeks/month)
Example:

Diet Plan (Rp30,000) × 2 meal types × 5 delivery days × 4.3 = Rp1,290,000/month

🎨 Styling System
CSS Architecture

Component-based: Styles organized by component
CSS Custom Properties: Consistent color scheme
Responsive Design: Mobile-first breakpoints
Dark Theme: Professional dark color palette

Color Scheme
css:root {
  --bg-primary: #111827;
  --bg-secondary: #1f2937;
  --text-primary: #ffffff;
  --text-secondary: #d1d5db;
  --accent: #60a5fa;
  --success: #059669;
  --error: #ef4444;
}
🧪 Development Guidelines
Code Style

Use functional components with hooks
Implement proper error handling
Follow React best practices
Use descriptive variable names
Add comments for complex logic

Component Guidelines
jsx// Preferred pattern
const ComponentName = ({ prop1, prop2, onAction }) => {
  const [state, setState] = useState(initialValue)
  
  const handleAction = () => {
    // Handle action
    onAction(data)
  }
  
  return (
    <div className="component-name">
      {/* Component JSX */}
    </div>
  )
}
State Management

Use useState for local component state
Lift state up when shared between components
Use service classes for business logic
Implement proper error boundaries

🔧 Build and Deployment
Development Build
bashnpm run dev          # Start dev server on localhost:5173
Production Build
bashnpm run build        # Build optimized production bundle
npm run preview      # Preview production build locally
Build Output

dist/: Production build files
dist/assets/: Optimized CSS and JS files
dist/index.html: Main HTML file

🐛 Troubleshooting
Common Issues
Development server won't start
bash# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
Build errors
bash# Check for ESLint errors
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
Styling issues

Check CSS file imports
Verify class name spellings
Clear browser cache

🚀 Performance Optimization
Implemented Optimizations

Code Splitting: React.lazy() for route-based splitting
Image Optimization: Optimized assets in public directory
CSS Optimization: Minimal and scoped styles
Bundle Analysis: Vite's built-in optimization

Best Practices

Minimize re-renders with proper dependency arrays
Use useMemo for expensive calculations
Implement proper loading states
Optimize image sizes and formats

🔒 Security Considerations
Client-Side Security

All user inputs are sanitized
XSS protection implemented
CSRF tokens for form submissions
Secure password hashing (simulated)

Validation

Email format validation
Indonesian phone number validation
Password strength requirements
Required field validation
