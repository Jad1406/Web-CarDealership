import React, { useEffect, useState } from 'react'
import { Add, Remove } from "@mui/icons-material";

const CartItem = ({ 
  part,
  incrementQuantity,
  decrementQuantity
}) => {

  //Create the states required. For the each item in the cart, we need its name, price per unit, quantity requested.
    const itemName = part.car_part_title;
    // const itemID = part.car_part_id;

  return (

    <div className="bg-gray-800 shadow-md rounded-lg flex items-center justify-between p-4 hover:scale-105 transition-transform duration-200 ease-in-out w-full max-w-md mx-auto">
      <p className="text-white font-medium">{itemName}</p>
      
      <div id="addMoreButtons" className="flex items-center gap-2">
        <button
          onClick={incrementQuantity}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
        >
          <Add fontSize="small" />
        </button>

        <p className="text-white font-semibold">{part.quantity}</p>

        <button
          onClick={decrementQuantity}
          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full"
        >
          <Remove fontSize="small" />
        </button>
      </div>

      
    </div>
  )
}

export default CartItem
