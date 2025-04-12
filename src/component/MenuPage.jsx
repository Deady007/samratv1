import React from "react";
import { Link } from "react-router-dom";
import chicken from "./images/chicken_dish.jpg";
import egg from "./images/egg_dish.png";
import fish from "./images/fish_dish.jpg";
import meat from "./images/meat_dish.png";
import "./MenuPage.css"; 


const MenuItem = ({ name, img, link }) => {
  return (
    <Link to={link} className="menu-item">
      <img src={img} alt={name} className="menu-image" />
      <div className="menu-name">{name}</div>
    </Link>
  );
};


const MenuPage = () => {
  const menuItems = [
    { name: "Chicken Items", img: chicken, link: "/ChickenItems" },
    { name: "Mutton Items", img: meat, link: "/Meat" },
    { name: "Egg Items", img: egg, link: "/Egg" },
    { name: "Seafood Items", img: fish, link: "/SeaFoodItems" },
  ];

  return (
    <section id="menu" className="menu">
      <h2>BROWSE MENU CATEGORIES</h2>
      <div className="menu-items">
        {menuItems.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default MenuPage;