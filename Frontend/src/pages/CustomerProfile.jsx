import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton } from '@mui/material';

const CustomerProfile = () => {
  const [editMode, setEditMode] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john@example.com"
  });

  const [appointments] = useState([
    { date: "2025-04-02", service: "Oil Change" },
    { date: "2025-04-10", service: "Tire Rotation" }
  ]);

  const [orders] = useState([
    { partName: "Air Filter", date: "2025-03-25", status: "Shipped" },
    { partName: "Brake Pads", date: "2025-03-28", status: "Processing" }
  ]);

  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const saveChanges = () => {
    setEditMode(false);
    // Submit updated userInfo to backend if needed
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 bg-gray-800 text-white shadow">
        <h1 className="text-xl font-bold">My Profile</h1>
        <div className="flex space-x-4">
          {/* <IconButton><NotificationsIcon sx={{ color: 'white' }} /></IconButton> */}
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
                  <p><strong>Date:</strong> {appt.date}</p>
                  <p><strong>Service:</strong> {appt.service}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming appointments.</p>
          )}
        </div>

        {/* Ordered Parts */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Ordered Parts</h2>
          {orders.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {orders.map((order, i) => (
                <li key={i} className="border rounded p-4 bg-gray-100">
                  <p><strong>Part:</strong> {order.partName}</p>
                  <p><strong>Order Date:</strong> {order.date}</p>
                  <p><strong>Status:</strong> {order.status}</p>
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
