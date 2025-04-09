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
  const [cartItems, setCartItems] = useState([]);
  const [carParts, setCarParts] = useState([]);

  const location = useLocation();
  const { category } = location.state || {};

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

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-800 shadow-lg">
        <SearchBar />
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
        <aside className="w-[20%] bg-gray-700 border-r border-gray-600 p-4">
          <h2 className="text-xl font-semibold mb-4 text-white">Your Cart</h2>
          <Cart cartItems={cartItems} />
        </aside>

        {/* Parts Grid */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold text-white mb-6 capitalize">
            {category || "All Parts"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {carParts
              .filter((part) => part.car_part_category === category)
              .map((part, index) => (
                <RequestedPartCard
                  image={imgTest}
                  price={part.car_part_price}
                  partName={part.car_part_name}
                  quantity={part.car_part_available_qty}
                  onAddToCart={() => {
                    setCartItems((prevItems) => [
                      ...prevItems,
                      { partName: part.car_part_name, price: part.price },
                    ]);
                  }
                }
                key={index}
                />

              ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RequestedPart;
