import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { blue } from "@mui/material/colors";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

const Cart = ({
            cartItems, 
            clearCart,
            decrementQuantity,
            incrementQuantity,
            totalPrice
}) => {

  return (
    <div className="p-4 bg-gray-800 rounded-xl shadow-lg space-y-4">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-lg font-bold text-white">Shopping Cart</h1>
        <IconButton>
          <ShoppingCartIcon sx={{ color: blue[400] }} />
        </IconButton>
      </div>

      <div className="space-y-2">
        {cartItems.map((part, index) => (
          <CartItem
            key={index}
            part = {part}
            incrementQuantity={()=>incrementQuantity(part)}
            decrementQuantity={()=>decrementQuantity(part)}
          />
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-600">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out">
          <Link to="/Checkout">Checkout</Link>
        </button>
        <button
          className="text-red-400 hover:text-red-600 transition"
          onClick={clearCart}
        >
          Clear Cart
        </button>

        <p>${totalPrice}</p>
      </div>
    </div>
  );
};

export default Cart;
