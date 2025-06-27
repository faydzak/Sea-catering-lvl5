import React, { useState } from 'react';
import { Phone, MapPin, Clock, Users, Utensils, Truck, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import './HomePage.css';

const HomePage = ({ setCurrentPage, testimonials, setTestimonials }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [testimonialForm, setTestimonialForm] = useState({
    name: '',
    message: '',
    rating: 5
  });

  const handleTestimonialSubmit = (e) => {
    e.preventDefault();
    if (testimonialForm.name && testimonialForm.message) {
      const newTestimonial = {
        id: testimonials.length + 1,
        ...testimonialForm
      };
      setTestimonials([...testimonials, newTestimonial]);
      setTestimonialForm({ name: '', message: '', rating: 5 });
      alert('Thank you for your testimonial!');
    }
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`star ${i < rating ? 'star-filled' : 'star-empty'}`}
      />
    ));
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h2 className="hero-title">SEA Catering</h2>
            <p className="hero-slogan">"Healthy Meals, Anytime, Anywhere"</p>
            <p className="hero-description">
              Welcome to SEA Catering, your premier destination for customizable healthy meal services 
              with delivery across Indonesia. We're committed to bringing nutritious, delicious meals 
              right to your doorstep, making healthy eating convenient and accessible for everyone.
            </p>
            <button 
              onClick={() => setCurrentPage('menu')}
              className="hero-button"
            >
              Explore Our Menu
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="container">
          <div className="section-header">
            <h3 className="section-title">About SEA Catering</h3>
            <p className="section-description">
              What started as a small business has quickly become a nationwide sensation. 
              SEA Catering specializes in providing customizable healthy meal plans that can be 
              delivered to cities across Indonesia.
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Utensils />
              </div>
              <h4 className="feature-title">Fresh Ingredients</h4>
              <p className="feature-description">We source only the freshest, highest-quality ingredients for all our meals.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Users />
              </div>
              <h4 className="feature-title">Customizable Plans</h4>
              <p className="feature-description">Tailor your meal plans to fit your dietary needs and preferences.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Truck />
              </div>
              <h4 className="feature-title">Reliable Delivery</h4>
              <p className="feature-description">Fast and reliable delivery service across major cities in Indonesia.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h3 className="section-title">What Our Customers Say</h3>
          </div>
          
          {/* Testimonial Carousel */}
          <div className="testimonial-carousel">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="testimonial-stars">
                  {renderStars(testimonials[currentTestimonial]?.rating || 0)}
                </div>
                <p className="testimonial-message">
                  "{testimonials[currentTestimonial]?.message}"
                </p>
                <p className="testimonial-author">
                  - {testimonials[currentTestimonial]?.name}
                </p>
              </div>
              
              <button 
                onClick={prevTestimonial}
                className="carousel-button carousel-prev"
              >
                <ChevronLeft />
              </button>
              
              <button 
                onClick={nextTestimonial}
                className="carousel-button carousel-next"
              >
                <ChevronRight />
              </button>
            </div>
          </div>

          {/* Testimonial Form */}
          <div className="testimonial-form-container">
            <div className="testimonial-form-card">
              <h4 className="form-title">Share Your Experience</h4>
              <form onSubmit={handleTestimonialSubmit} className="testimonial-form">
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    value={testimonialForm.name}
                    onChange={(e) => setTestimonialForm({...testimonialForm, name: e.target.value})}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Your Review</label>
                  <textarea
                    value={testimonialForm.message}
                    onChange={(e) => setTestimonialForm({...testimonialForm, message: e.target.value})}
                    className="form-textarea"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Rating</label>
                  <select
                    value={testimonialForm.rating}
                    onChange={(e) => setTestimonialForm({...testimonialForm, rating: parseInt(e.target.value)})}
                    className="form-select"
                  >
                    {[5,4,3,2,1].map(num => (
                      <option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                
                <button type="submit" className="form-submit">
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;