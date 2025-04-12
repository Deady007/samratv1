import React from 'react';
import './AllMenu.css';
import toast, { Toaster } from 'react-hot-toast';

const allItems = [
  { id: 1, name: "Butter Chicken", price: 299, image: "https://images.immediate.co.uk/production/volatile/sites/30/2021/02/butter-chicken-ac2ff98.jpg" },
  { id: 2, name: "Tandoori Chicken", price: 249, image: "https://maharajaroyaldining.com/wp-content/uploads/2024/03/Tandoori-Chicken-3.webp" },
  { id: 3, name: "Chicken Biryani", price: 199, image: "https://www.ruchifoodline.com/recipes//cdn/recipes/chicken-biryani.jpg" },
  { id: 4, name: "Chicken Curry", price: 229, image: "https://www.foodandwine.com/thmb/8YAIANQTZnGpVWj2XgY0dYH1V4I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/spicy-chicken-curry-FT-RECIPE0321-58f84fdf7b484e7f86894203eb7834e7.jpg" },
  { id: 5, name: "Chicken Lollipop", price: 179, image: "https://www.cookwithkushi.com/wp-content/uploads/2022/01/best_chicken_lollipop_drums_of_chicken-500x500.jpg" },
  { id: 6, name: "Chicken 65", price: 189, image: "https://www.teaforturmeric.com/wp-content/uploads/2024/05/Chicken-65-11.jpg" },
  { id: 7, name: "Chicken Kebab", price: 259, image: "https://www.licious.in/blog/wp-content/uploads/2020/12/Chicken-Kebab.jpg" },
  { id: 8, name: "Chicken Chilly", price: 209, image: "https://vismaifood.com/storage/app/uploads/public/65b/760/990/thumb__700_0_0_0_auto.jpg" },
  { id: 9, name: "Egg Curry", price: 149, image: "https://www.whiskaffair.com/wp-content/uploads/2019/03/Chettinad-Egg-Curry-2-3.jpg" },
  { id: 10, name: "Egg Biryani", price: 179, image: "https://spicecravings.com/wp-content/uploads/2020/10/Egg-Biryani-Featured-1-500x500.jpg" },
  { id: 11, name: "Masala Omelette", price: 99, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs6vyNQ-XvtKGzsH_Oiya0EwlUZtoiCGQgTA&s" },
  { id: 12, name: "Egg Bhurji", price: 129, image: "https://www.licious.in/blog/wp-content/uploads/2020/12/Egg-Bhurji.jpg" },
  { id: 13, name: "Anda Gotala", price: 159, image: "https://www.foodie-trail.com/wp-content/uploads/2023/04/20230406_141619244_iOS-scaled.jpg" },
  { id: 14, name: "Fish Curry", price: 249, image: "https://i.ytimg.com/vi/ZqkcrV326WY/maxresdefault.jpg" },
  { id: 15, name: "Mutton Kebabs", price: 299, image: "https://i.ytimg.com/vi/JxKFZGwuMbo/maxresdefault.jpg" },
  { id: 16, name: "Grilled Chicken", price: 349, image: "https://cookathomemom.com/wp-content/uploads/2021/05/Grilled-BBQ-CHicken-Drumsticks.jpg" },
  { id: 17, name: "Prawn Masala", price: 399, image: "https://crownresto.com/wp-content/uploads/2022/08/prawn-masala.jpg" },
  { id: 18, name: "Mutton Curry", price: 349, image: "https://vismaifood.com/storage/app/uploads/public/c60/766/cd3/thumb__1200_0_0_0_auto.jpg" },
  { id: 19, name: "Mutton Biryani", price: 399, image: "https://www.licious.in/blog/wp-content/uploads/2022/06/mutton-hyderabadi-biryani-01.jpg" },
  { id: 20, name: "Mutton Korma", price: 379, image: "https://static.toiimg.com/thumb/52554168.cms?imgsize=572669&width=800&height=800" },
  { id: 21, name: "Mutton Rogan Josh", price: 429, image: "https://recipes.timesofindia.com/thumb/53192600.cms?width=1200&height=900" },
  { id: 22, name: "Mutton Kebabs", price: 299, image: "https://c.ndtvimg.com/2020-08/n6ogafj_kebab_625x300_12_August_20.jpg" },
  { id: 23, name: "Prawn Masala", price: 399, image: "https://www.licious.in/blog/wp-content/uploads/2020/12/Prawns-Masala-min.jpg" },
  { id: 24, name: "Fish Curry", price: 349, image: "https://5.imimg.com/data5/SELLER/Default/2024/9/450200199/YQ/YC/AI/230584086/fish-curry-half-500x500.jpg" },
  { id: 25, name: "Grilled Prawns", price: 429, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREaeTN5NleRKMHSkBmRU1O1AZiQXCGQqSRbQ&s" },
  { id: 26, name: "Tandoori Fish", price: 379, image: "https://www.foodandwine.com/thmb/rggaJ1ELW6bF4rPgA_-fLejhfNo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Maneet-Chauhan-Diwali-Celebration-Tandoori-Pomfret-FT-BLOG1022-2000-f78e70a420a242e2bcd471fccf067614.jpg" },
  { id: 27, name: "Crab Masala", price: 459, image: "https://www.yummytummyaarthi.com/wp-content/uploads/2022/07/crab-masala-1.jpg" },
];

const AllMenu = ({ cartAllItems, setCartAllItems }) => {
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
    <div className='all-menu-container'>
      <Toaster />
      <h1 className='menu-heading-1'>ALL OUR MENU</h1>
      <div className='menu-grid'>
        {allItems.map((item) => (
          <div key={item.id} className="menu-item">
            <img src={item.image} alt={item.name} className="menu-item-image" />
            <p className="menu-item-name">{item.name}</p>
            <p className="menu-item-price">₹{item.price}</p>
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMenu;
