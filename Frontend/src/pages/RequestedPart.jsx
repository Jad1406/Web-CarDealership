import { React, useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import Cart from '../components/Cart';
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useLocation } from 'react-router-dom';
import RequestedPartCard from '../components/RequestedPartCard';
import imgTest from '../assets/MarketAssets/InteriorRemake.jpg';


const RequestedPart = () => {

  //Since the set functions take some time and are asynchronous,
  //I create a state which updates instantly to resolve some bugs in the updatePrice function
  const [cartItemsCounter, setCartItemsCounter] = useState(() => {
    const storedCounter = localStorage.getItem('cartItemsCounter');
    return storedCounter ? parseInt(storedCounter) : 0;
  });
  
  const [cartItems, setCartItems] = useState(() => {
    //Doing it this way allows us to preserve the state of the cart items even after refreshing the page
    //This is because the useState function is only called once when the component mounts
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const [carParts, setCarParts] = useState([]);

  const location = useLocation();
  const { category } = location.state || {};

  const [searchTerm, setSearchTerm] = useState('')
  const [totalPrice, setTotalPrice] = useState(() => {
    const storedTotalPrice = localStorage.getItem('totalPrice');
    return storedTotalPrice ? parseFloat(storedTotalPrice) : 0;
  });
  

  //Get the data from database
  useEffect(() => {
    async function fetchData() {
      let result = await fetch(`http://localhost:9000/api/carParts`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });

      result = await result.json();
      setCarParts(result);
    }

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartItemsCounter', cartItemsCounter);
  }, [cartItems, cartItemsCounter]);
  
  useEffect(() => {
    localStorage.setItem('totalPrice', totalPrice);
  }, [totalPrice]);

  // Function to add an item to the cart
  function addToCart(part) {
    console.log("Adding to cart:", part);
  
    // Check if the item already exists in the cart
    const existingItem = cartItems.find((item) => item.car_part_id === part.car_part_id);
  
    if (!existingItem) {
      setCartItemsCounter((prev) => prev + 1);
      console.log("Adding new item to cart, The cart items are now:", cartItemsCounter);
  
      // Add the item to the cart with quantity 1
      setCartItems((prevItems) => [...prevItems, { ...part, quantity: 1 }]);
      updatePrice(part.car_part_price); // Pass the price of the part
    }
  
    console.log("Updated cart items:", cartItems);
  }

  // Function to remove an item from the cart
  function removeItem(itemId) {
    console.log("Removing item with ID:", itemId);
  
    const itemToRemove = cartItems.find((item) => item.car_part_id === itemId);
    if (!itemToRemove) return; // If the item doesn't exist, do nothing
  
    setCartItemsCounter((prev) => Math.max(prev - itemToRemove.quantity, 0));
    setCartItems((prevItems) => prevItems.filter((item) => item.car_part_id !== itemId));
    updatePrice(-itemToRemove.car_part_price * itemToRemove.quantity); // Adjust the price based on quantity
  }

  //Function to increment the quantity of the item in the cart
  function incrementQuantity(item) {
    console.log("Incrementing quantity for part with ID:", item.car_part_id);
    if (item.car_part_available_qty > item.quantity) {
      setCartItemsCounter(prev => prev + 1);
      setCartItems((prevItems) =>
        prevItems.map((part) =>
          part.car_part_id === item.car_part_id ? { ...part, quantity: part.quantity + 1 } : part
        )
      );
      updatePrice(item.car_part_price);
    }
    
  }

  //Function to decrement the quantity of the item in the cart
  function decrementQuantity(item) {
    console.log("Decrementing quantity for item with ID:", item.car_part_id);
    if (item.quantity > 1) {
      setCartItemsCounter((prev) => prev - 1);
      setCartItems((prevItems) =>
        prevItems.map((part) =>
          part.car_part_id === item.car_part_id ? { ...part, quantity: part.quantity - 1 } : part
        )
      );
      updatePrice(-item.car_part_price); // Decrease the price
    } else {
      // If the quantity is 1, remove the item from the cart
      removeItem(item.car_part_id);
    }
  }

  // Clear entire cart
  function clearCart(){
    setCartItems([]);
    setTotalPrice(0);
    setCartItemsCounter(0);
  };

  //function to update the price of the item in the cart
  function updatePrice(price) {
    setTotalPrice((prevPrice) => {
      const newPrice = prevPrice + parseFloat(price);
      return newPrice >= 0 ? newPrice : 0; // Ensure the price doesn't go below 0
    });
  }

  // Filter inventory based on search term
  let filteredInventory = carParts.filter((part) =>
    `${part.car_part_title}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-800 shadow-lg">
        <SearchBar 
          onSearch={setSearchTerm}
        />
        <div className="flex space-x-4">
          <IconButton>
            <AccountCircleIcon sx={{ color: 'white' }} />
          </IconButton>
          <IconButton>
            <ShoppingCartIcon sx={{ color: 'white' }} />
          </IconButton>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        
        {/* Cart Sidebar */}
        <aside className="w-[27%] bg-gray-700 border-r border-gray-600 p-4">
          <h2 className="text-xl font-semibold mb-4 text-white">Your Cart</h2>

          {/* Cart */}
          <Cart 
            cartItems={cartItems} 
            totalPrice={totalPrice}
            clearCart={clearCart}
            decrementQuantity={decrementQuantity}
            incrementQuantity={incrementQuantity}
            removeItem={removeItem}
            setCartItems={setCartItems}
            updatePrice={updatePrice}
          />
        </aside>

        {/* Parts Grid */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold text-white mb-6 capitalize">
            {category || "All Parts"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchTerm == "" ? (carParts
              .filter((part) => !category || part.car_part_category === category)
              .map((part, index) => (
                <RequestedPartCard
                  part={part}
                  key={index}
                  addToCart={addToCart}
                />
              ))):
              (filteredInventory
                .filter((part) => !category || part.car_part_category === category)
                .map((part, index) => (
                  <RequestedPartCard
                    part={part}
                    key={index}
                    addToCart={addToCart}
                  />
                )))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RequestedPart;
