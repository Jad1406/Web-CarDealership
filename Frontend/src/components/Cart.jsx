import React, { useState } from "react";
import { IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { blue } from "@mui/material/colors";
import CartItem from "./CartItem";

const Cart = (props) => {
  const [cartItems, setCartItems] = useState(props.cartItems || []);

  // Increment quantity
  const increment = (index) => {
    const newCart = [...cartItems];
    newCart[index].quantity = (newCart[index].quantity || 1) + 1;
    setCartItems(newCart);
  };

  // Decrement quantity
  const decrement = (index) => {
    const newCart = [...cartItems];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      setCartItems(newCart);
    }
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="p-4 bg-gray-800 rounded-xl shadow-lg space-y-4">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-lg font-bold text-white">Shopping Cart</h1>
        <IconButton>
          <ShoppingCartIcon sx={{ color: blue[400] }} />
        </IconButton>
      </div>

      <div className="space-y-2">
        {cartItems.map((item, index) => (
          <CartItem
            key={index}
            partName={item.partName}
            price={item.price}
            quantity={item.quantity || 1}
            onIncrement={() => increment(index)}
            onDecrement={() => decrement(index)}
          />
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-600">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out">
          Checkout
        </button>
        <button
          className="text-red-400 hover:text-red-600 transition"
          onClick={clearCart}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
