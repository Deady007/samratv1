import React, { useState } from "react";
import man_chicken from"./images/man_chicken.jpg";
import "./CreateAccount.css";

const Createaccount = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Account Created", formData);
  };

  return (
    <div className="createaccount">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <label className="sign-up-label text-light">FULL NAME</label>
        <input
          type="text"
          name="username"
          placeholder="Your name"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label className="sign-up-label text-light">YOUR EMAIL</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label className="sign-up-label text-light">PASSWORD</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label className="sign-up-label text-light">CONFIRM PASSWORD</label>
        <input
          type="password"
          name="password"
          placeholder="Confirm Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        <button type="submit">Sign Up</button>
      </form>
      <img src={man_chicken} alt="man" className="right-image"/>
    </div>
  );
};

export default Createaccount;
