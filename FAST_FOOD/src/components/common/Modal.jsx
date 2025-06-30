import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ plan, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h3 className="modal-title">{plan.name}</h3>
        <button onClick={onClose} className="modal-close">
          <X />
        </button>
      </div>
      
      <div className="modal-body">
        <div className="modal-plan-info">
          <div className="modal-image">{plan.image}</div>
          <p className="modal-price">{plan.price} per meal</p>
        </div>
        
        <p className="modal-details">{plan.details}</p>
        
        <div className="modal-features">
          <h4 className="features-title">Features:</h4>
          {plan.features.map((feature, index) => (
            <div key={index} className="feature-item">
              <div className="feature-bullet"></div>
              {feature}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Modal;