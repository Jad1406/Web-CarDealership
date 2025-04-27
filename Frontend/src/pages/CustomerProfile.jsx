import React, { useEffect, useState } from 'react';
import { Button, TextField, CircularProgress } from '@mui/material';
import { Calendar, ShoppingCart, User, Mail, Edit, Save, X, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import ChatBot from '../components/ChatBot';

// Avatar manually recreated since MUI AvatarFallback etc. don't exist
const Avatar = ({ name }) => {
  return (
    <div className="h-16 w-16 rounded-full bg-gray-800 flex items-center justify-center text-white text-2xl font-bold">
      {name?.substring(0, 2).toUpperCase()}
    </div>
  );
};

const CustomerProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const [userData, setUserData] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [orders, setOrders] = useState([]);
  
  const [loadingPage, setLoadingPage] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const user_id = parseInt(localStorage.getItem('user_id'), 10);

  useEffect(() => {
    if (!user_id) return;

    const fetchAllData = async () => {
      try {
        setLoadingPage(true);

        const [userRes, apptRes, orderRes] = await Promise.all([
          fetch(`http://localhost:9000/api/users/${user_id}`),
          fetch(`http://localhost:9000/api/appointments/user/?user_id=${user_id}`),
          fetch(`http://localhost:9000/api/orders/user?user_id=${user_id}`)
        ]);

        if (!userRes.ok || !apptRes.ok || !orderRes.ok) {
          throw new Error('Failed to fetch some data');
        }

        console.log("orderRes", JSON.stringify(orderRes));
        

        const userData = await userRes.json();
        const appointmentsData = await apptRes.json();
        const ordersData = await orderRes.json();

        setUserData(userData);
        setUserInfo({
          name: userData.username || '',
          email: userData.user_email || ''
        });
        setAppointments(appointmentsData);
        setOrders(ordersData);
        setError(null);
      } catch (err) {
        console.error('Error loading profile:', err);
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoadingPage(false);
      }
    };

    fetchAllData();
  }, [user_id]);

  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const saveChanges = async () => {
    try {
      setSaving(true);
      const updatedUser = {
        ...userData,
        username: userInfo.name,
        user_email: userInfo.email,
      };

      const response = await fetch(`http://localhost:9000/api/users/${user_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error('Failed to save changes');
      }

      setUserData(updatedUser);
      setEditMode(false);
      setError(null);
    } catch (err) {
      console.error('Error saving changes:', err);
      setError(err.message || 'Failed to save profile changes');
    } finally {
      setSaving(false);
    }
  };

  if (loadingPage) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-4xl text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-800 p-8 rounded-lg text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-xl font-bold text-white">Error</h2>
          <p className="text-gray-400">{error}</p>
          <Button onClick={() => window.location.reload()} variant="contained" color="error">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      {/* Top Bar */}
      <div className="bg-gray-900 border-b border-gray-800 py-4 px-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <User className="h-6 w-6 text-green-400" />
          My Profile
        </h1>
      </div>

      {/* Main Content */}
      <div className="p-6 max-w-4xl mx-auto space-y-8">
        {/* Profile Card */}
        <div className="bg-gray-900 rounded-xl p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <User className="h-6 w-6 text-blue-400" />
              User Information
            </h2>
            <Button
              variant="outlined"
              onClick={() => setEditMode(!editMode)}
              className="border-gray-700 text-gray-400 hover:text-white"
            >
              {editMode ? (
                <>
                  <X className="h-4 w-4 mr-2" /> Cancel
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </>
              )}
            </Button>
          </div>

          <div className="flex items-center gap-6">
            <Avatar name={userInfo.name} />
            <div>
              <p className="text-lg font-semibold">{userInfo.name}</p>
              <p className="text-gray-400 flex items-center gap-1">
                <Mail className="h-4 w-4" /> {userInfo.email}
              </p>
            </div>
          </div>

          {editMode ? (
            <div className="space-y-4">
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={userInfo.name}
                onChange={handleInputChange}
                variant="outlined"
                className="bg-gray-800 text-white"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
                variant="outlined"
                className="bg-gray-800 text-white"
              />
              <Button
                onClick={saveChanges}
                variant="contained"
                color="success"
                disabled={saving}
                className="flex items-center gap-2"
              >
                {saving ? <CircularProgress size={24} color="inherit" /> : <Save className="h-4 w-4" />}
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          ) : null}
        </div>

        {/* Appointments */}
        <div className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
            <Calendar className="h-6 w-6 text-purple-400" />
            Appointments
          </h2>
          {appointments.length > 0 ? (
            appointments.map((appt, idx) => (
              <div key={idx} className="bg-gray-800 p-4 rounded-lg mb-4">
                <p className="font-bold text-lg">{appt.appointment_type}</p>
                <p className="text-gray-400">{appt.appointment_due_date}</p>
                <p className="text-gray-300">
                  Status: <span className={twMerge({
                    'text-blue-400': appt.appointment_status === 'scheduled',
                    'text-yellow-400': appt.appointment_status === 'in progress',
                    'text-green-400': appt.appointment_status === 'completed',
                    'text-red-400': appt.appointment_status === 'cancelled',
                  })}>{appt.appointment_status}</span>
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No appointments found.</p>
          )}
        </div>

        {/* Orders */}
        <div className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
            <ShoppingCart className="h-6 w-6 text-yellow-400" />
            Orders
          </h2>
          {orders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {orders.map((order, idx) => (
                <div key={idx} className="bg-gray-800 p-4 rounded-lg">
                  <p className="font-bold">Order #{order.order_id}</p>
                  <p className="text-gray-400">{order.order_date}</p>
                  <p className="text-gray-300">Order Type: {order.order_type}</p>
                  {order.order_type === 'delivery' && (
                    <>
                      <p className="text-gray-300">Location: {order.delivery_location}</p>
                      <p className="text-gray-300">Expected Delivery: {order.expected_delivery_date}</p>
                    </>
                  )}
                  {/* <p className="text-gray-300">Total: <span className="text-green-400">${order.total_price.toFixed(2)}</span></p> */}
                  <p className="text-gray-300">Payment: {order.payment_type}</p>
                  <p className="text-gray-400">Items: {order.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No orders found.</p>
          )}
        </div>
      </div>

      <ChatBot />
    </div>
  );
};

export default CustomerProfile;
