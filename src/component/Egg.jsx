import React from "react";
import "./Egg.css";
import  toast, { Toaster } from 'react-hot-toast';

const eggitemes = [
  { id: 9, name: "Egg Curry", price: 149, image: "https://www.whiskaffair.com/wp-content/uploads/2019/03/Chettinad-Egg-Curry-2-3.jpg" },
  { id: 10, name: "Egg Biryani", price: 179, image: "https://spicecravings.com/wp-content/uploads/2020/10/Egg-Biryani-Featured-1-500x500.jpg" },
  { id: 11, name: "Masala Omelette", price: 99, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs6vyNQ-XvtKGzsH_Oiya0EwlUZtoiCGQgTA&s" },
  { id: 12, name: "Egg Bhurji", price: 129, image: "https://www.licious.in/blog/wp-content/uploads/2020/12/Egg-Bhurji.jpg" },
  { id: 13, name: "Anda Gotala", price: 159, image: "https://www.foodie-trail.com/wp-content/uploads/2023/04/20230406_141619244_iOS-scaled.jpg" },
];

const EggItems = ({ cartAllItems, setCartAllItems }) => {
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
      <h2>Egg itemes</h2>
      <div className="menu-grid">
        {eggitemes.map((item) => (
          <div key={item.id} className="menu-item">
            <img src={item.image} alt={item.name} className="menu-image" />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EggItems;
