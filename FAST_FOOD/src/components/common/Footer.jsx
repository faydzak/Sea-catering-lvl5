import React from 'react';
import { Utensils } from 'lucide-react';

const Footer = () => (
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
);

export default Footer;