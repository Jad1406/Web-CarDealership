import React, { useEffect } from 'react'
import { useState } from 'react'

const CartItem = (props) => {

    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    function incrementQuantity() {
        setQuantity(quantity + 1);
        setTotalPrice(price * (quantity + 1));
    }
    function decrementQuantity() {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            setTotalPrice(price * (quantity - 1));
        }
    }

    useEffect(() => {
        setPrice(props.price);
        setTotalPrice(price * quantity);
    }
    , [quantity]);
  return (

    <div className="bg-gray-800 shadow-md rounded-lg flex flex-col items-center p-4 hover:scale-105 transition-transform duration-200 ease-in-out">
      <p>{props.partName}</p>
      <div id="addMoreButtons">
        <button onClick={incrementQuantity}>+</button>
        <button onClick={decrementQuantity}>-</button>
      </div>
    </div>
  )
}

export default CartItem
