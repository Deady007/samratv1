import React from 'react';
import './Navbar.css';
import logo from './images/logo.png';
import accountIcon from './images/account_icon.png'; // Uploaded account icon image
import { Link } from 'react-router-dom';


const Navbar = ({ setShowLogin, cartAllItems, userInitial }) => {
  
  // Calculate total number of items in the cart
  const totalCartCount = cartAllItems?.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  return (
    <div className='navbar'>
      <img src={logo} alt='logo' className='logo' />

      <ul>
        <Link to='/'><h3 className='left'>NON-VEG FOODS</h3></Link>
      </ul>

      <ul className='navbar-menu'>
        <li><Link to="/MenuPage">MENU</Link></li>
        <li><Link to='/Offers'>OFFERS</Link></li>
      </ul>

      <div className='navbar-right'>
        {userInitial ? (
          <Link to="/UserLoggedIn" className="account-section">
            <img src={accountIcon} alt="Account" className="account-icon" />
          </Link>
        ) : (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        )}

        <div className="cart-wrapper">
          <Link to="/CartPage" className="cart-link">
            <span className="cart-text">MyCart</span>
            <span className='count'>{totalCartCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
