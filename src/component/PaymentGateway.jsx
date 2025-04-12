import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PaymentGateway.css';
import toast, { Toaster } from 'react-hot-toast';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const PaymentGateway = ({userInitial}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { cartItems, totalAmount } = location.state || { cartItems: [], totalAmount: 0 };

  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiryDate: '', cvv: '' });
  const [upiId, setUpiId] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser) {
      setShowLogin(true);
      toast.error("Please login to place the order.");
    }
  }, [currentUser]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDeliveryInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentSelection = (method) => {
    setPaymentMethod(method);
  };

  const handlePaymentSubmission = async (event) => {
    event.preventDefault();

    if (!currentUser) {
      setShowLogin(true);
      toast.error("Login required to place order.");
      return;
    }

    for (const key in deliveryInfo) {
      if (!deliveryInfo[key].trim()) {
        const fieldName = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        toast.error(`Please fill in the ${fieldName}.`);
        return;
      }
    }

    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    if (paymentMethod === 'card' && (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv)) {
      toast.error("Please fill in card details.");
      return;
    }

    if (paymentMethod === 'upi' && !upiId) {
      toast.error("Please enter UPI ID.");
      return;
    }

    toast.success("Payment Successful!");

    const db = getFirestore();

    await addDoc(collection(db, 'orders'), {
      userId: currentUser.uid,
      items: cartItems,
      totalAmount: totalAmount,
      deliveryInfo,
      paymentMethod,
      orderDate: serverTimestamp(),
      status: 'Confirmed',
    });

    // Clear cart after order
    localStorage.removeItem("cartItems");

    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 2000);
  };

  return (
    <>
      <Toaster position="top-center" />
      {userInitial ? (
        <div className="login-required">
          <h2>Please Login to Continue</h2>
          <button onClick={() => setShowLogin(true)}>Go to Login</button>
        </div>
      ) : (
        <form className="payment-gateway-page" onSubmit={handlePaymentSubmission}>
          <div className="delivery-info-left">
            <p className="title">Delivery Information</p>
            <div className="multi-fields">
              <input type="text" name="firstName" placeholder="First name" value={deliveryInfo.firstName} onChange={handleInputChange} />
              <input type="text" name="lastName" placeholder="Last name" value={deliveryInfo.lastName} onChange={handleInputChange} />
            </div>
            <input type="email" name="email" placeholder="Email address" value={deliveryInfo.email} onChange={handleInputChange} />
            <input type="text" name="street" placeholder="Street" value={deliveryInfo.street} onChange={handleInputChange} />
            <div className="multi-fields">
              <input type="text" name="city" placeholder="City" value={deliveryInfo.city} onChange={handleInputChange} />
              <input type="text" name="state" placeholder="State" value={deliveryInfo.state} onChange={handleInputChange} />
            </div>
            <div className="multi-fields">
              <input type="text" name="zipCode" placeholder="Zip code" value={deliveryInfo.zipCode} onChange={handleInputChange} />
              <input type="text" name="country" placeholder="Country" value={deliveryInfo.country} onChange={handleInputChange} />
            </div>
            <input type="tel" name="phone" placeholder="Phone" value={deliveryInfo.phone} onChange={handleInputChange} />
          </div>

          <div className="cart-summary-right">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>₹{(totalAmount - 2).toFixed(2)}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>₹2.00</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>₹{totalAmount.toFixed(2)}</b>
              </div>
            </div>

            <div className="payment-options">
              <h2>Payment Options</h2>

              <div className="payment-method-dropdown">
                <label>Select Payment Method</label>
                <select value={paymentMethod || ''} onChange={(e) => handlePaymentSelection(e.target.value)}>
                  <option value="" disabled>Select a method</option>
                  <option value="card">Card Payment</option>
                  <option value="upi">UPI Payment</option>
                  <option value="cod">Cash on Delivery</option>
                </select>
              </div>

              {paymentMethod === 'card' && (
                <div className="card-details">
                  <input type="text" placeholder="Card Number" value={cardDetails.cardNumber} onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })} />
                  <input type="text" placeholder="Expiry Date (MM/YY)" value={cardDetails.expiryDate} onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })} />
                  <input type="text" placeholder="CVV" value={cardDetails.cvv} onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} />
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="upi-details">
                  <input type="text" placeholder="Enter UPI ID" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
                </div>
              )}
            </div>

            <button type="submit" className="proceed-button">Confirm Payment</button>
          </div>
        </form>
      )}
    </>
  );
};

export default PaymentGateway;
