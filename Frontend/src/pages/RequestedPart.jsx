import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import Cart from '../components/Cart';
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useLocation, useNavigate } from 'react-router-dom';
import RequestedPartCard from '../components/RequestedPartCard';
import ChatBot from '../components/ChatBot';

const RequestedPart = () => {
  const [cartItemsCounter, setCartItemsCounter] = useState(() => {
    const storedCounter = localStorage.getItem('cartItemsCounter');
    return storedCounter ? parseInt(storedCounter) : 0;
  });

  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const [carParts, setCarParts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { category } = location.state || {};
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPrice, setTotalPrice] = useState(() => {
    const storedTotalPrice = localStorage.getItem('totalPrice');
    return storedTotalPrice ? parseFloat(storedTotalPrice) : 0;
  });

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

  function addToCart(part) {
    const existingItem = cartItems.find((item) => item.car_part_id === part.car_part_id);
    if (!existingItem) {
      setCartItemsCounter((prev) => prev + 1);
      setCartItems((prevItems) => [...prevItems, { ...part, quantity: 1 }]);
      updatePrice(part.car_part_price);
    }
  }

  function removeItem(itemId) {
    const itemToRemove = cartItems.find((item) => item.car_part_id === itemId);
    if (!itemToRemove) return;
    setCartItemsCounter((prev) => Math.max(prev - itemToRemove.quantity, 0));
    setCartItems((prevItems) => prevItems.filter((item) => item.car_part_id !== itemId));
    updatePrice(-itemToRemove.car_part_price * itemToRemove.quantity);
  }

  function incrementQuantity(item) {
    if (item.car_part_available_qty > item.quantity) {
      setCartItemsCounter((prev) => prev + 1);
      setCartItems((prevItems) =>
        prevItems.map((part) =>
          part.car_part_id === item.car_part_id ? { ...part, quantity: part.quantity + 1 } : part
        )
      );
      updatePrice(item.car_part_price);
    }
  }

  function decrementQuantity(item) {
    if (item.quantity > 1) {
      setCartItemsCounter((prev) => prev - 1);
      setCartItems((prevItems) =>
        prevItems.map((part) =>
          part.car_part_id === item.car_part_id ? { ...part, quantity: part.quantity - 1 } : part
        )
      );
      updatePrice(-item.car_part_price);
    } else {
      removeItem(item.car_part_id);
    }
  }

  function clearCart() {
    setCartItems([]);
    setTotalPrice(0);
    setCartItemsCounter(0);
  }

  function updatePrice(price) {
    setTotalPrice((prevPrice) => {
      const newPrice = prevPrice + parseFloat(price);
      return newPrice >= 0 ? newPrice : 0;
    });
  }

  let filteredInventory = carParts.filter((part) =>
    `${part.car_part_title}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-800 shadow-lg">
        {/* <IconButton onClick={() => navigate(-1)} className="mr-4">
          <ArrowBack sx={{ color: 'white' }} />
        </IconButton> */}
        <h2 className="text-3xl font-bold capitalize">{category || "All Parts"}</h2>
        <div className="flex space-x-4">
          <SearchBar onSearch={setSearchTerm} />
          <IconButton>
            <AccountCircleIcon sx={{ color: 'white' }} />
          </IconButton>
          <IconButton>
            <ShoppingCartIcon sx={{ color: 'white' }} />
          </IconButton>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row items-start p-4">
        {/* Cart */}
        <aside className="w-full md:w-[30%] md:mr-8 mb-8 md:mb-0">
          <h2 className="text-xl font-semibold mb-4 text-white">Your Cart</h2>
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
        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchTerm === ""
              ? carParts
                .filter((part) => !category || part.car_part_category === category)
                .map((part, index) => (
                  <RequestedPartCard part={part} key={index} addToCart={addToCart} />
                ))
              : filteredInventory
                .filter((part) => !category || part.car_part_category === category)
                .map((part, index) => (
                  <RequestedPartCard part={part} key={index} addToCart={addToCart} />
                ))}
          </div>
          {/* <button
            onClick={() => navigate(-1)}
            className="mt-6 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg flex items-center justify-center w-full md:w-auto"
          >
            <ArrowBack size={20} className="mr-2" />
            Back to {category ? category : 'Parts'}
          </button> */}
        </main>
      </div>
    <ChatBot />
    </div>
  );
};

export default RequestedPart;

