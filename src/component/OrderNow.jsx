import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderNow.css"

const OrderNow = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setTimeout(() => {
      navigate("/MenuPage");
    }, 500); // Small delay for UX
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Choose Your Order Type</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
          onClick={() => handleOptionSelect("Takeaway")}
        >
          Takeaway
        </button>
        <button
          className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
          onClick={() => handleOptionSelect("Dine-in")}
        >
          Dine-in
        </button>
        <button
          className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
          onClick={() => handleOptionSelect("Delivery")}
        >
          Delivery
        </button>
      </div>
    </div>
  );
};

export default OrderNow;
