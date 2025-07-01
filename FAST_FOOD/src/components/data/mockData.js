import { hashPassword } from '../utils/security';

const mealPlans = [
  {
    id: 1,
    name: "Diet Plan",
    price: "Rp30.000",
    priceValue: 30000,
    description: "Perfect for weight management and healthy living",
    image: "🥗",
    details: "Our Diet Plan includes carefully portioned meals with lean proteins, fresh vegetables, and whole grains. Each meal is designed to keep you satisfied while supporting your weight management goals.",
    features: ["Low calorie", "High protein", "Fresh vegetables", "Portion controlled"]
  },
  {
    id: 2,
    name: "Protein Plan",
    price: "Rp40.000",
    priceValue: 40000,
    description: "High-protein meals for active individuals",
    image: "🍗",
    details: "The Protein Plan is designed for athletes and fitness enthusiasts. Each meal contains premium protein sources, complex carbohydrates, and essential nutrients to fuel your active lifestyle.",
    features: ["High protein content", "Post-workout recovery", "Muscle building", "Energy sustaining"]
  },
  {
    id: 3,
    name: "Royal Plan",
    price: "Rp60.000",
    priceValue: 60000,
    description: "Premium gourmet meals with finest ingredients",
    image: "👑",
    details: "Experience luxury dining with our Royal Plan. Each meal features premium ingredients, gourmet preparation, and restaurant-quality presentation delivered to your door.",
    features: ["Premium ingredients", "Gourmet preparation", "Restaurant quality", "Luxury experience"]
  }
];

const initialTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    message: "SEA Catering has transformed my eating habits. The meals are delicious and perfectly portioned!",
    rating: 5
  },
  {
    id: 2,
    name: "Ahmad Rahman",
    message: "Excellent service and fresh ingredients. I love the variety in their meal plans.",
    rating: 5
  },
  {
    id: 3,
    name: "Maria Santos",
    message: "The Royal Plan is absolutely amazing. Restaurant-quality meals delivered to my home!",
    rating: 5
  }
];

const initialUsers = [
  {
    id: 1,
    fullName: 'Admin User',
    email: 'admin@seacatering.com',
    password: hashPassword('AdminPass123!'),
    role: 'admin',
    createdAt: new Date().toISOString()
  }
];

const subscriptions = [];

export default {
  mealPlans,
  testimonials: initialTestimonials,
  users: initialUsers,
  subscriptions
};