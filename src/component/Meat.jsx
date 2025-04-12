import React, { useState } from "react";
import "./Meat.css";
import  toast, { Toaster } from 'react-hot-toast';

const meatitemes = [
  { id: 18, name: "Mutton Curry", price: 349, image: "https://vismaifood.com/storage/app/uploads/public/c60/766/cd3/thumb__1200_0_0_0_auto.jpg" },
  { id: 19, name: "Mutton Biryani", price: 399, image: "https://www.licious.in/blog/wp-content/uploads/2022/06/mutton-hyderabadi-biryani-01.jpg" },
  { id: 20, name: "Mutton Korma", price: 379, image: "https://static.toiimg.com/thumb/52554168.cms?imgsize=572669&width=800&height=800" },
  { id: 21, name: "Mutton Rogan Josh", price: 429, image: "https://recipes.timesofindia.com/thumb/53192600.cms?width=1200&height=900" },
  { id: 22, name: "Mutton Kebabs", price: 299, image: "https://c.ndtvimg.com/2020-08/n6ogafj_kebab_625x300_12_August_20.jpg" },
];

const MeatItems = ({ cartAllItems, setCartAllItems }) => {

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
      <h2>Mutton itemes</h2>
      <div className="menu-grid">
        {meatitemes.map((item) => (
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

export default MeatItems;
