import React, { useState } from 'react';
import './CartPage.css';
import bucket from './images/empty_bucket.jpg';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const CartPage = ({ cartAllItems, setCartAllItems }) => {
  const [promoCode, setPromoCode] = useState('');
  const navigate = useNavigate();

  const handleIncrement = (id) => {
    setCartAllItems((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, count: (item?.count || 1) + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCartAllItems((prevCart) =>
      prevCart.map((item) =>
        item.id === id && (item.count || 1) > 1
          ? { ...item, count: (item?.count || 1) - 1 }
          : item
      )
    );
  };

  const handleDeleteItem = (id) => {
    const filteredItems = cartAllItems?.filter((item) => item?.id !== id);
    setCartAllItems(filteredItems);
    toast.success('Item Removed From Cart Successfully!');
  };

  const subtotal = cartAllItems.reduce(
    (acc, item) => acc + item.price * (item.count || 1),
    0
  );
  const deliveryFee = 2;
  const total = subtotal + deliveryFee;

  const proceedToPayment = () => {
    navigate('/PaymentGateway', {
      state: {
        cartItems: cartAllItems,
        totalAmount: total,
      },
    });
  };

  return (
    <div className='cart-page'>
      <Toaster />
      {cartAllItems?.length > 0 ? (
        <>
          <div className='cart-items-container'>
            {cartAllItems.map((item) => (
              <div key={item?.id} className='cart-card'>
                <img src={item.image} alt={item?.name} className='card-img' />
                <h3>{item?.name}</h3>
                <p className='card-price'>₹{item?.price * (item?.count || 1)}</p>

                <div className='card-qty-controls'>
                  <button onClick={() => handleDecrement(item?.id)} disabled={item?.count <= 1}>-</button>
                  <span>{item?.count}</span>
                  <button onClick={() => handleIncrement(item?.id)}>+</button>
                </div>

                <button className='remove-btn' onClick={() => handleDeleteItem(item?.id)}>Remove</button>
              </div>
            ))}
          </div>

          <div className='cart-bottom'>
            <div className='cart-total'>
              <h2>Cart Total</h2>
              <div className='cart-total-details'>
                <p>SubTotal</p>
                <p>₹{subtotal}</p>
              </div>
              <hr />
              <div className='cart-total-details'>
                <p>Delivery Fee</p>
                <p>₹{deliveryFee}</p>
              </div>
              <hr />
              <div className='cart-total-details'>
                <b>Total</b>
                <b>₹{total}</b>
              </div>
            </div>
            <button onClick={proceedToPayment}>PROCEED TO CHECKOUT</button>
          </div>
        </>
      ) : (
        <div className='empty-cart'>
          <img src={bucket} alt='empty bucket' className='image' />
          <h1>Your Cart is Empty</h1>
          <Link to='/allMenu'>
            <button>START ORDER</button>
          </Link>
        </div>
      )}

      <div className='cart-promocode'>
        <p>If you have a promo code, enter it here</p>
        <div className='cart-promocode-input'>
          <input
            type='text'
            placeholder='promo code'
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
