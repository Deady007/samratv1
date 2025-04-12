import React from "react";
import "./Offers.css";
import spicychicken from "./images/Spicy_chicken_combo.jpg";
import specialgrill from "./images/grilled_chicken_special.jpg";
import royalbiryani from "./images/chicken_biryani_special.jpg";

const offers = [
  {
    id: 1,
    image: spicychicken,
    title: "Spicy Chicken Combo",
    description: "Enjoy a crispy chicken combo with fries and a drink.",
    discount: "Flat 20% Off",
  },
  {
    id: 2,
    image: specialgrill,
    title: "Grilled Chicken Special",
    description: "Juicy grilled chicken served with butter naan.",
    discount: "Buy 1 Get 1 Free",
  },
  {
    id: 3,
    image: royalbiryani,
    title: "Royal Chicken Biryani",
    description: "Delicious dum biryani with authentic flavors.",
    discount: "₹100 Off on Large Pack",
  },
];

const Offers = () => {
  return (
    <div className="offers-container">
      <h2>Exclusive Offers</h2>
      <div className="offers-list">
        {offers.map((offer) => (
          <div key={offer.id} className="offer-card">
            <img src={offer.image} alt={offer.title} />
            <h3>{offer.title}</h3>
            <p>{offer.description}</p>
            <span className="offer-discount">{offer.discount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
