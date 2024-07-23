import React from 'react';
import '../App.css'; // Create this CSS file for styling the modal

const OrderModal = ({ show, onClose, onSubmit, orderDetails, onChange, showThankYouMessage }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        {!showThankYouMessage ? (
          <>
            <h3>Place Your Order</h3>
            <form onSubmit={onSubmit}>
              <label>Name:
                <input 
                  type="text" 
                  name="name" 
                  value={orderDetails.name} 
                  onChange={onChange} 
                  required 
                />
              </label>
              <label>Address:
                <input 
                  type="text" 
                  name="address" 
                  value={orderDetails.address} 
                  onChange={onChange} 
                  required 
                />
              </label>
              <label>Payment Method:
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="Cash on Delivery" 
                  checked 
                  readOnly 
                /> Cash on Delivery
              </label>
              <label>Size:
                <select 
                  name="size" 
                  value={orderDetails.size} 
                  onChange={onChange} 
                  required
                >
                  <option value="">Select Size</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
              </label>
              <button type="submit">Place Order</button>
            </form>
          </>
        ) : (
          <>
            <p>Thank you for shopping with us! You will receive your order within 7 business days.</p>
            <button onClick={onClose}>Continue Shopping</button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderModal;
