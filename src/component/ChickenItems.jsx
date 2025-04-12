import React from "react";
import "./Chicken-items.css";
import  toast, { Toaster } from 'react-hot-toast';

const chickenitemes = [
  { id: 1, name: "Butter Chicken", price: 299, image: "https://images.immediate.co.uk/production/volatile/sites/30/2021/02/butter-chicken-ac2ff98.jpg" },
  { id: 2, name: "Tandoori Chicken", price: 249, image: "https://maharajaroyaldining.com/wp-content/uploads/2024/03/Tandoori-Chicken-3.webp" },
  { id: 3, name: "Chicken Biryani", price: 199, image: "https://www.ruchifoodline.com/recipes//cdn/recipes/chicken-biryani.jpg" },
  { id: 4, name: "Chicken Curry", price: 229, image: "https://www.foodandwine.com/thmb/8YAIANQTZnGpVWj2XgY0dYH1V4I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/spicy-chicken-curry-FT-RECIPE0321-58f84fdf7b484e7f86894203eb7834e7.jpg" },
  { id: 5, name: "Chicken Lollipop", price: 179, image: "https://www.cookwithkushi.com/wp-content/uploads/2022/01/best_chicken_lollipop_drums_of_chicken-500x500.jpg" },
  { id: 6, name: "Chicken 65", price: 189, image: "https://www.teaforturmeric.com/wp-content/uploads/2024/05/Chicken-65-11.jpg" },
  { id: 7, name: "Chicken Kebab", price: 259, image: "https://www.licious.in/blog/wp-content/uploads/2020/12/Chicken-Kebab.jpg" },
  { id: 8, name: "Chicken Chilly", price: 209, image: "https://vismaifood.com/storage/app/uploads/public/65b/760/990/thumb__700_0_0_0_auto.jpg" },
];

const ChickenItems = ({ cartAllItems, setCartAllItems }) => {
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
      <h2>Chicken Items</h2>
      <div className="menu-grid">
        {chickenitemes.map((item) => (
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

export default ChickenItems;
