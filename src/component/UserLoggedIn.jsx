import React, { useEffect, useState } from 'react';
import './UserLoggedIn.css';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const UserLoggedIn = ({ userName }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const [orders, setOrders] = useState([]);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/');
    });
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (auth.currentUser) {
        const q = query(collection(db, 'orders'), where('userId', '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const userOrders = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(userOrders);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="user-logged-in-container">
      <div className="sidebar">
        <h2>GOOD AFTERNOON<br />{userName?.toUpperCase()}!</h2>
        <ul className="sidebar-menu">
          <li>Order History</li>
          <li>My Favorite Menu</li>
          <li>Addresses</li>
          <li>Account Settings</li>
        </ul>
        <button className="signout-btn" onClick={handleSignOut}>Sign Out</button>
      </div>

      <div className="main-content">
        <div className="order-history">
          <h2>ORDER HISTORY</h2>
          {orders.length === 0 ? (
            <p>No orders have been placed in the past 12 months.</p>
          ) : (
            <ul className="order-list">
              {orders.map(order => (
                <li key={order.id} className="order-item">
                  <h4>Order ID: {order.id}</h4>
                  <p>Total: ₹{order.totalAmount}</p>
                  <p>Status: {order.status}</p>
                  <p>Ordered On: {order.orderDate?.toDate().toLocaleString()}</p>
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>{item.name} x {item.quantity}</li>
                    ))}
                  </ul>
                  <hr />
                </li>
              ))}
            </ul>
          )}
          <Link to='/allMenu'><button className="crimson-btn">View Menu</button></Link>
        </div>

        <div className="help-section">
          <h2>HAVE A QUESTION?</h2>
          <p>Connect with a specialist for answers.</p>
          <button className="crimson-btn">Get Help</button>
        </div>
      </div>
    </div>
  );
};

export default UserLoggedIn;
