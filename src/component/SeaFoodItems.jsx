import React from "react";
import "./SeaFood.css";
import  toast, { Toaster } from 'react-hot-toast';

const seaFooditemes = [
  { id: 23, name: "Prawn Masala", price: 399, image: "https://www.licious.in/blog/wp-content/uploads/2020/12/Prawns-Masala-min.jpg" },
  { id: 24, name: "Fish Curry", price: 349, image: "https://5.imimg.com/data5/SELLER/Default/2024/9/450200199/YQ/YC/AI/230584086/fish-curry-half-500x500.jpg" },
  { id: 25, name: "Grilled Prawns", price: 429, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREaeTN5NleRKMHSkBmRU1O1AZiQXCGQqSRbQ&s" },
  { id: 26, name: "Tandoori Fish", price: 379, image: "https://www.foodandwine.com/thmb/rggaJ1ELW6bF4rPgA_-fLejhfNo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Maneet-Chauhan-Diwali-Celebration-Tandoori-Pomfret-FT-BLOG1022-2000-f78e70a420a242e2bcd471fccf067614.jpg" },
  { id: 27, name: "Crab Masala", price: 459, image: "https://www.yummytummyaarthi.com/wp-content/uploads/2022/07/crab-masala-1.jpg" },
];

const SeaFoodItems = ({ cartAllItems, setCartAllItems }) => {
  
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
    <div className="menu-container">
      <Toaster />
      <h2>Seafood itemes</h2>
      <div className="menu-grid">
        {seaFooditemes.map((item) => (
          <div key={item.id} className="menu-item">
            <img src={item.image} alt={item.name} className="menu-image" loading="lazy" />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeaFoodItems;
