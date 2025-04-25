import React, { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';

const CustomerProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });
  const [appointments, setAppointments] = useState([]);
  const [orders, setOrders] = useState([]);

  const user_id = localStorage.getItem("user_id");

  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const saveChanges = async () => {
    try {
      const response = await fetch(`http://localhost:9000/api/users/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, ...userInfo }),
      });
      if (!response.ok) throw new Error("Failed to update user info");
      setEditMode(false);
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/users/user?user_id=${user_id}`);
        const data = await response.json();
        setUserInfo({ name: data.name, email: data.email });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/appointments/user?user_id=${user_id}`);
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/orders/user?user_id=${user_id}`);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (user_id) {
      fetchUserData();
      fetchAppointments();
      fetchOrders();
    }
  }, [user_id]);

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 bg-gray-800 text-white shadow">
        <h1 className="text-xl font-bold">My Profile</h1>
        <div className="flex space-x-4">
          <IconButton><AccountCircleIcon sx={{ color: 'white' }} /></IconButton>
        </div>
      </div>

      <div className="p-6 max-w-5xl mx-auto">
        {/* Profile Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">User Info</h2>
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "Cancel" : "Edit"}
            </button>
          </div>

          {editMode ? (
            <form className="space-y-4">
              <input
                className="w-full border rounded p-2"
                name="name"
                value={userInfo.name}
                onChange={handleInputChange}
                placeholder="Full Name"
              />
              <input
                className="w-full border rounded p-2"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
              <button
                type="button"
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                onClick={saveChanges}
              >Save</button>
            </form>
          ) : (
            <div>
              <p><strong>Name:</strong> {userInfo.name}</p>
              <p><strong>Email:</strong> {userInfo.email}</p>
            </div>
          )}
        </div>

        {/* Appointments */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
          {appointments.length > 0 ? (
            <ul className="space-y-3">
              {appointments.map((appt, i) => (
                <li key={i} className="p-3 border rounded bg-gray-100">
                  <p><strong>Type:</strong> {appt.appointment_type}</p>
                  <p><strong>Status:</strong> {appt.appointment_status}</p>
                  <p><strong>Due:</strong> {appt.appointment_due_date}</p>
                  <p><strong>Car:</strong> {`${appt.car_manufacturer} ${appt.car_model} (${appt.car_year})`}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming appointments.</p>
          )}
        </div>

        {/* Orders */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Ordered Parts</h2>
          {orders.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {orders.map((order, i) => (
                <li key={i} className="border rounded p-4 bg-gray-100">
                  <p><strong>Order Type:</strong> {order.order_type}</p>
                  <p><strong>Order Date:</strong> {order.order_date}</p>
                  {order.order_type === "delivery" && (
                    <>
                      <p><strong>Delivery Location:</strong> {order.delivery_location}</p>
                      <p><strong>Expected Delivery:</strong> {order.expected_delivery_date}</p>
                    </>
                  )}
                  <p><strong>Total Price:</strong> ${order.total_price}</p>
                  <p><strong>Payment Type:</strong> {order.payment_type}</p>
                  <p><strong>Items:</strong> {order.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>You haven't ordered any parts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
