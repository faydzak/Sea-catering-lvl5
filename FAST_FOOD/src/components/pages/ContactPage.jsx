import React from 'react';
import { Phone, MapPin, Clock, Utensils } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <div className="container">
        <div className="page-header">
          <h2 className="page-title">Contact Us</h2>
          <p className="page-description">
            We're here to help with your healthy meal journey
          </p>
        </div>

        <div className="contact-card">
          <div className="contact-content">
            <div className="contact-icon">
              <Phone />
            </div>
            <h3 className="contact-title">Get in Touch</h3>
            
            <div className="contact-info">
              <div className="contact-item">
                <p className="contact-label">Customer Service Hotline:</p>
                <a href="tel:+621234567890" className="contact-phone">
                  +62 123 456 7890
                </a>
              </div>
            </div>

            <div className="contact-message">
              <p>Available Monday to Friday, 9 AM - 6 PM</p>
              <p>We'll be happy to assist you with meal plans, deliveries, and any questions!</p>
            </div>
          </div>
        </div>

        {/* Additional Contact Information */}
        <div className="services-grid">
          <div className="service-card">
            <div className="feature-icon">
              <MapPin />
            </div>
            <h4 className="feature-title">Delivery Areas</h4>
            <p className="feature-description">
              We deliver to all major cities across Indonesia including Jakarta, 
              Surabaya, Bandung, and more!
            </p>
          </div>

          <div className="service-card">
            <div className="feature-icon">
              <Clock />
            </div>
            <h4 className="feature-title">Delivery Times</h4>
            <p className="feature-description">
              Morning deliveries: 6 AM - 9 AM<br/>
              Lunch deliveries: 11 AM - 2 PM<br/>
              Dinner deliveries: 5 PM - 8 PM
            </p>
          </div>

          <div className="service-card">
            <div className="feature-icon">
              <Utensils />
            </div>
            <h4 className="feature-title">Custom Orders</h4>
            <p className="feature-description">
              Need catering for events? Contact us for custom meal plans and 
              bulk orders. We cater to all dietary needs!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;