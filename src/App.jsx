import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase Auth functions
import { app } from './firebase/firebase'; // Import your Firebase app instance
import './index.css';
import Navbar from './component/Navbar';
import Homepage from './component/Homepage';
import SignUp from './component/SignUp';
import PaymentGateway from './component/PaymentGateway';
import MenuPage from './component/MenuPage';
import ChickenItems from './component/ChickenItems';
import Meat from './component/Meat';
import SeaFoodItems from './component/SeaFoodItems';
import Egg from './component/Egg';
import Offers from './component/Offers';
import Footer from './component/Footer';
import OrderNow from './component/OrderNow'; // Corrected the case
import CartPage from './component/CartPage';
import AllMenu from './component/AllMenu';
import UserLoggedIn from './component/UserLoggedIn';
import AdminDashboard from './firebase/AdminDashboard';
import spicychicken from "./images/spicy_chicken_combo.jpg";

const auth = getAuth(app); // Initialize Firebase Auth

function App() {
  const [cartAllItems, setCartAllItems] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [userInitial, setUserInitial] = useState('');
  const [userId, setUserId] = useState(null); // Optional: Store user ID if needed
  const [loadingAuth, setLoadingAuth] = useState(true); // Add loading state

  // Removed ProductId state and related useEffect as it seems unrelated to auth

  // Effect to listen for Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        console.log("User is signed in:", user);
        // Try getting name from localStorage first (set during signup)
        const storedName = localStorage.getItem(`username_${user.uid}`);
        setUserInitial(storedName ? storedName[0].toUpperCase() : (user.email ? user.email[0].toUpperCase() : 'U')); // Use email initial if name not found
        setUserId(user.uid); // Store user ID
        setShowLogin(false); // Hide login popup if user is logged in
      } else {
        // User is signed out.
        console.log("User is signed out");
        setUserInitial('');
        setUserId(null);
        // Optionally clear username from localStorage on explicit sign out elsewhere
      }
      setLoadingAuth(false); // Set loading to false once auth state is determined
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Removed the previous ProductId useEffect

  // Display a loading indicator while checking auth state
  if (loadingAuth) {
    return <div>Loading...</div>; // Or a more sophisticated loading component
  }

  return (
    <>
      {showLogin && !userId && ( // Only show login if needed and user is not logged in
        <SignUp
          setShowLogin={setShowLogin}
          setUserInitial={setUserInitial}
          setUserId={setUserId} // Pass setUserId
        />
      )}

      <div className='app'>
        <Navbar
          setShowLogin={setShowLogin}
          cartAllItems={cartAllItems}
          userInitial={userInitial}
        />

        <Routes>
          {/* Keep your existing routes */}
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/' element={<><Homepage cartAllItems={cartAllItems} setCartAllItems={setCartAllItems} /><Footer /></>} />
          <Route path='/MenuPage' element={<><MenuPage /><Footer /></>} />
          <Route path='/PaymentGateway' element={<><PaymentGateway /><Footer /></>} />
          <Route path='/Chickenitems' element={<><ChickenItems cartAllItems={cartAllItems} setCartAllItems={setCartAllItems} /><Footer /></>} />
          <Route path='/Meat' element={<><Meat cartAllItems={cartAllItems} setCartAllItems={setCartAllItems} /><Footer /></>} />
          <Route path='/Ordernow' element={<><OrderNow /><Footer /></>} />
          <Route path='/Seafooditems' element={<><SeaFoodItems cartAllItems={cartAllItems} setCartAllItems={setCartAllItems} /><Footer /></>} />
          <Route path='/Egg' element={<><Egg cartAllItems={cartAllItems} setCartAllItems={setCartAllItems} /><Footer /></>} />
          <Route path='/Offers' element={<><Offers /><Footer /></>} />
          <Route path='/allMenu' element={<><AllMenu cartAllItems={cartAllItems} setCartAllItems={setCartAllItems} /><Footer /></>} />
          <Route path='/CartPage' element={<><CartPage cartAllItems={cartAllItems} setCartAllItems={setCartAllItems} /><Footer /></>} />
          {/* Pass userName (initial) and potentially userId to UserLoggedIn */}
          <Route path='/UserLoggedIn' element={<><UserLoggedIn userName={userInitial} userId={userId} /><Footer /></>} />
        </Routes>
      </div>
    </>
  );
}

export default App;