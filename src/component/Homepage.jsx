import React, {useContext} from "react";
import "./Homepage.css";
import back from "./images/back.jpg";
import  toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";


const menuItems = [
  { id: 14, name: "Fish Curry", price: 249, image: "https://i.ytimg.com/vi/ZqkcrV326WY/maxresdefault.jpg" },
  { id: 15, name: "Mutton Kebabs", price: 299, image: "https://i.ytimg.com/vi/JxKFZGwuMbo/maxresdefault.jpg" },
  { id: 16, name: "Grilled Chicken", price: 349, image: "https://cookathomemom.com/wp-content/uploads/2021/05/Grilled-BBQ-CHicken-Drumsticks.jpg" },
  { id: 17, name: "Prawn Masala", price: 399, image: "https://crownresto.com/wp-content/uploads/2022/08/prawn-masala.jpg" }
];



const Homepage = ({ cartAllItems, setCartAllItems }) => {
  const handleAddToCart = (item) => {
    const alreadyExists = cartAllItems.some((cartItem) => cartItem.id === item.id);

    if (alreadyExists) {
      toast.error('Item already in cart!');
    } else {
      setCartAllItems([...cartAllItems, { ...item, count: 1 }]);
      toast.success('Item added to cart!');
    }
  };

  return (
    <div className="homepage">
      <Toaster />
      {/* Hero Section */}
      <section className="hero">
        <h2>Samrat Non-veg Foods</h2> 
        <h2>Delicious Non-Veg Delights</h2>
        <h3>Experience the taste of authentic non-veg dishes</h3>
        <img src={back} alt="back" className="back" />
        <Link to='/allMenu'><button>Order Now</button></Link>
      </section>

      <div className="slogan">
        <section className="menu-heading">
          <h2>We Serve The Best Quality Non-Veg Food Dishes and Varieties</h2>
        </section>
      </div>

      {/* Menu Section */}
      <div className="menu-container">
        <h1 className="menu-heading">OUR SPECIAL ITEMS</h1>
        <div className="menu-items">
          {menuItems.map((item) => (
            <div key={item.id} className="menu-item">
              <img src={item.image} alt={item.name} className="menu-item-image" />
              <p className="menu-item-name">{item.name}</p>
              <p className="menu-item-price">₹{item.price}</p>
              <button className="add-to-cart-btn" onClick={()=>handleAddToCart(item)}>Add to Cart</button>
            </div>
          ))}
        </div>
        <div className="more-menu">
              <Link to='/allMenu'><button>Browse More Menu</button> </Link>
            </div>
      </div>
    </div>
  );
};

export default Homepage;
