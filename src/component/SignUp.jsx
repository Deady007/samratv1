import React, { useState } from 'react';
import './SignUp.css';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from './firebase';
import cross from './images/cross.jpg';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; // Added navigation

const auth = getAuth(app);

const SignUp = ({ setShowLogin, setUserInitial, setUserId }) => {
  const [currState, setCurrState] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate(); // Hook for redirect

  const handleSubmit = (e) => {
    e.preventDefault();

    const processAuth = (userCredential) => {
      const user = userCredential.user;
      toast.success(currState === "Sign Up" ? 'Account Created Successfully!' : 'Logged In Successfully!');

      // Store user name for display
      if (currState === "Sign Up" && name) {
        localStorage.setItem(`username_${user.uid}`, name);
        setUserInitial(name[0].toUpperCase());
      } else {
        const storedName = localStorage.getItem(`username_${user.uid}`);
        setUserInitial(storedName ? storedName[0].toUpperCase() : (user.email ? user.email[0].toUpperCase() : 'U'));
      }

      setUserId(user.uid);

      // Check if admin
      if (email === "meetkhaire037@gmail.com") {
        navigate("/admin"); // Redirect admin
      } else {
        setShowLogin(false); // Hide login popup for regular users
      }
    };

    const handleAuthError = (err) => {
      toast.error(err.message);
      console.error("Firebase Auth Error:", err);
    };

    if (currState === "Sign Up") {
      if (!name.trim()) {
        toast.error("Please enter your name.");
        return;
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then(processAuth)
        .catch(handleAuthError);
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(processAuth)
        .catch(handleAuthError);
    }
  };

  return (
    <div className='login-popup'>
      <Toaster />
      <form className='login-popup-container' onSubmit={handleSubmit}>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={cross} alt='close' />
        </div>

        <div className='login-popup-inputs'>
          {currState === "Sign Up" && (
            <input
              type='text'
              placeholder='Your Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type='email'
            placeholder='Your Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type='submit'>
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className='login-popup-condition'>
          <input type='checkbox' required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {currState === "Login" ? (
          <p>Don't have an account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>
        )}
      </form>
    </div>
  );
};

export default SignUp;
