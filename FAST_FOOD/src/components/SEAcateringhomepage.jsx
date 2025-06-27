import React from 'react';
import { Phone, MapPin, Clock, Users, Utensils, Truck } from 'lucide-react';
import './SEACateringHomepage.css';

const SEACateringHomepage = () => {
  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <Utensils className="logo-icon" />
              <h1>SEA Catering</h1>
            </div>
            <nav className="nav">
              <a href="#home" className="nav-link active">Home</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#services" className="nav-link">Services</a>
              <a href="#contact" className="nav-link">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <h2 className="hero-title">SEA Catering</h2>
            <p className="hero-slogan">"Healthy Meals, Anytime, Anywhere"</p>
            <p className="hero-description">
              Welcome to SEA Catering, your premier destination for customizable healthy meal services 
              with delivery across Indonesia. We're committed to bringing nutritious, delicious meals 
              right to your doorstep, making healthy eating convenient and accessible for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-header">
            <h3 className="section-title">About SEA Catering</h3>
            <p className="section-description">
              What started as a small business has quickly become a nationwide sensation. 
              SEA Catering specializes in providing customizable healthy meal plans that can be 
              delivered to cities across Indonesia. Our mission is to make eating healthy more 
              accessible and convenient for busy individuals and families.
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

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <h3 className="section-title">Our Key Features & Services</h3>
            <p className="section-description">Discover what makes SEA Catering the perfect choice for your healthy lifestyle</p>
          </div>
          
          <div className="services-grid">
            <div className="service-card">
              <MapPin className="service-icon" />
              <h4 className="service-title">Nationwide Delivery</h4>
              <p className="service-description">
                We deliver to major cities across Indonesia, ensuring fresh meals reach you wherever you are.
              </p>
            </div>
            
            <div className="service-card">
              <Utensils className="service-icon" />
              <h4 className="service-title">Meal Customization</h4>
              <p className="service-description">
                Choose from various meal plans and customize them according to your dietary preferences and restrictions.
              </p>
            </div>
            
            <div className="service-card">
              <Users className="service-icon" />
              <h4 className="service-title">Nutritional Information</h4>
              <p className="service-description">
                Detailed nutritional information for every meal, helping you make informed dietary choices.
              </p>
            </div>
            
            <div className="service-card">
              <Clock className="service-icon" />
              <h4 className="service-title">Flexible Scheduling</h4>
              <p className="service-description">
                Schedule your deliveries according to your lifestyle with flexible timing options.
              </p>
            </div>
            
            <div className="service-card">
              <Truck className="service-icon" />
              <h4 className="service-title">Fresh Daily Preparation</h4>
              <p className="service-description">
                All meals are prepared fresh daily in our certified kitchens for maximum quality and taste.
              </p>
            </div>
            
            <div className="service-card">
              <Phone className="service-icon" />
              <h4 className="service-title">24/7 Customer Support</h4>
              <p className="service-description">
                Our dedicated customer support team is available around the clock to assist you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <h3 className="section-title">Get In Touch</h3>
            <p className="section-description">Ready to start your healthy eating journey? Contact us today!</p>
          </div>
          
          <div className="contact-card">
            <div className="contact-content">
              <div className="contact-icon">
                <Phone />
              </div>
              
              <h4 className="contact-title">Contact Details</h4>
              
              <div className="contact-info">
                <div className="contact-item">
                  <p className="contact-label">Manager: Brian</p>
                </div>
                
                <div className="contact-item">
                  <p className="contact-label">Phone Number:</p>
                  <a href="tel:08123456789" className="contact-phone">
                    08123456789
                  </a>
                </div>
              </div>
              
              <div className="contact-message">
                <p>
                  Call us today to discuss your meal plan options and get started with SEA Catering!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <Utensils className="footer-icon" />
              <h4>SEA Catering</h4>
            </div>
            <p className="footer-slogan">"Healthy Meals, Anytime, Anywhere"</p>
            <p className="footer-description">
              Thank you for choosing SEA Catering. We're committed to providing you with the best 
              healthy meal experience across Indonesia.
            </p>
            <div className="footer-divider">
              <p className="footer-copyright">&copy; 2025 SEA Catering. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SEACateringHomepage;