import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Truck, Store, CreditCard, ArrowLeft, CheckCircle } from 'lucide-react';

const CheckoutMenu = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const [totalPrice, setTotalPrice] = useState(() => {
    const storedTotalPrice = localStorage.getItem('totalPrice');
    return storedTotalPrice ? parseFloat(storedTotalPrice) : 0;
  });

  const [orderType, setOrderType] = useState("pickup");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [paymentType, setPaymentType] = useState("cash");

  const clearCart = () => {
    setCartItems([]);
    setTotalPrice(0);
    localStorage.removeItem('cartItems');
    localStorage.removeItem('totalPrice');
  };

  const generateDescription = () => {
    return cartItems
      .map(item => `${item.car_part_title} (x${item.quantity})`)
      .join(', ');
  };

  const calculateExpectedDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 3); // Add 3 days
    return date.toISOString().split('T')[0]; // format YYYY-MM-DD
  };

  const handleCheckout = async () => {
    if (orderType === "delivery" && deliveryLocation.trim() === "") {
      alert("Please enter a delivery location.");
      return;
    }

    const payload = {
      user_id: parseInt(localStorage.getItem('user_id')),
      order_type: orderType,
      expected_delivery_date: calculateExpectedDate(),
      delivery_location: orderType === "delivery" ? deliveryLocation : "",
      total_price: parseFloat(totalPrice),
      payment_type: paymentType,
      description: generateDescription(),
    };

    try {
      const response = await fetch("http://localhost:9000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Order placed successfully!");
        clearCart();
        navigate("/");
      } else {
        const errorMsg = await response.text();
        alert(`Failed to place order: ${errorMsg}`);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 flex justify-center items-center">
      <div className="w-full max-w-2xl bg-gray-900 rounded-xl p-8 shadow-xl border border-gray-800">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart size={28} className="text-green-400" />
          <h2 className="text-3xl font-bold">Checkout</h2>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-400">
            <ShoppingCart size={48} className="mx-auto mb-4" />
            <p className="text-xl mb-4">Your cart is empty.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white"
            >
              Back to Shop
            </button>
          </div>
        ) : (
          <>
            {/* Order Type */}
            <div className="mb-6">
              <label className="block mb-2 font-medium text-sm">Order Type</label>
              <div className="flex gap-4">
                <button
                  onClick={() => setOrderType("pickup")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                    orderType === "pickup"
                      ? "bg-green-600 border-green-500"
                      : "bg-gray-800 border-gray-700"
                  }`}
                >
                  <Store size={18} />
                  Pickup
                </button>
                <button
                  onClick={() => setOrderType("delivery")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                    orderType === "delivery"
                      ? "bg-green-600 border-green-500"
                      : "bg-gray-800 border-gray-700"
                  }`}
                >
                  <Truck size={18} />
                  Delivery
                </button>
              </div>
            </div>

            {/* Delivery Location */}
            {orderType === "delivery" && (
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium">Delivery Location</label>
                <input
                  type="text"
                  placeholder="Enter address"
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700"
                />
              </div>
            )}

            {/* Payment Type */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium">Payment Type</label>
              <div className="flex gap-4">
                <button
                  onClick={() => setPaymentType("cash")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                    paymentType === "cash"
                      ? "bg-green-600 border-green-500"
                      : "bg-gray-800 border-gray-700"
                  }`}
                >
                  💵 Cash
                </button>
                <button
                  onClick={() => setPaymentType("card")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                    paymentType === "card"
                      ? "bg-green-600 border-green-500"
                      : "bg-gray-800 border-gray-700"
                  }`}
                >
                  <CreditCard size={18} />
                  Card
                </button>
              </div>
            </div>

            {/* Items Summary */}
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2">Items:</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                {cartItems.map((item) => (
                  <li key={item.car_part_id}>
                    {item.car_part_title} (x{item.quantity}) - ${(
                      item.car_part_price * item.quantity
                    ).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Total + Checkout */}
            <div className="flex items-center justify-between mb-6 text-lg font-semibold">
              <span>Total:</span>
              <span className="text-green-400">${totalPrice.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 mb-4"
            >
              <CheckCircle size={20} />
              Place Order
            </button>

            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              Back to Shop
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutMenu;
