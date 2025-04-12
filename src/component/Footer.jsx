import React from "react"
import './Footer.css'
import logo_smarat from './images/logo.png'
import appstore from './images/app.png'

const Footer = () => {
    return (
        <>
        {/* Footer */ }
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <img src={logo_smarat} alt="logo" className="logo" />
                </div>
                <div className="footer-links">
                    <div>
                        <h3>Samrat India</h3>
                        <ul>
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Our History</li>
                            <li>Responsible Sourcing</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Legal</h3>
                        <ul>
                            <li>Terms and Conditions</li>
                            <li>Privacy Policy</li>
                            <li>Disclaimer</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Our Food</h3>
                        <ul>
                            <li>Menu</li>
                            <li>Order Tracking</li>
                            <li>Gift Cards</li>
                            <li>Nutrition & Allergen Info</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Support</h3>
                        <ul>
                            <li>Help Center</li>
                            <li>Contact Us</li>
                            <li>Feedback</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-app-links">
                    <img src={appstore} alt="Get it on appstore" className="google"/>
                </div>
            </div>
            <p className="footer-copy">
                &copy; 2025 Samrat Non-Veg Food Items. All rights reserved.
            </p>
        </footer>
      </>
    );
}

export default Footer