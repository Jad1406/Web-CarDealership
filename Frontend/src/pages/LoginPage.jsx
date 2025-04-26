import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../components/Notification'; // Adjust the path if needed
import '../css/loginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(0); // 0: no message, 1: success, 3: invalid credentials
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username: username,
      user_password: password,
    };

    try {
      let result = await fetch('http://localhost:9000/api/users/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-type': 'application/json',
        },
      });

      result = await result.json();

      if (result.message === 'Invalid username or password') {
        setLoginStatus(3); // Set status for invalid credentials
      } else if (result.message === 'Logged in successfully' || result.message === 'Logged in as admin') {
        setLoginStatus(1); // Set status for successful login
        localStorage.setItem('user_id', result.user_id);
        localStorage.setItem('username', result.username);
        navigate('/');
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginStatus(2); // Set status for unsuccessful login
    }
  };

  useEffect(() => {
    if (loginStatus !== 0) {
      const timer = setTimeout(() => {
        setLoginStatus(0); // Clear message after 3 seconds
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [loginStatus]);

  return (
    <div id='container' className="container flex flex-column justify-center items-center bg-slate-300 min-w-full min-h-screen">
      <div className='w-4/12 rounded-lg shadow-sky-800 h-auto p-6 bg-white relative overflow-hidden'>
        <Link to={'/'}><button className="cursor-pointer duration-200 hover:scale-125 active:scale-100" title="Go Back">
          <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" className="stroke-blue-300">
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M11 6L5 12M5 12L11 18M5 12H19"></path>
          </svg>
        </button></Link>

        <form action="" className='flex flex-col justify-between m-auto w-full mt-4 space-y-14'>
          <div className="flex flex-col justify-center items-center space-y-2">
            <h2 className="text-2xl font-medium text-slate-700">Login</h2>
            <p className="text-slate-500">Welcome Back!</p>
          </div>

          <div id="inputs" className='space-y-3'>
            <input
              className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
              name="text"
              required
              placeholder="Email or Username"
              type="text"
              onChange={(e) => { setUsername(e.target.value) }}
            />
            <input
              className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
              name="text"
              required
              placeholder="Password"
              type="password"
              onChange={(e) => { setPassword(e.target.value) }}
            />
            <p className='hover:underline hover:text-sky-400'><Link to={'/Recover_Account'}>Forgot password?</Link></p>
          </div>

          <div id="bottomPart" className='flex flex-row justify-between items-center'>
            <p className='hover:text-blue-500 text-sky-700 hover:underline'>No account? <Link to={'/Signin_Page'}>Create One!</Link></p>
            <button className='w-2/5 justify-center py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2' type='Submit' onClick={handleSubmit}>Log In</button>
          </div>
        </form>
      </div>
      {loginStatus === 1 && <Notification desc={1} />}
      {loginStatus === 3 && <Notification desc={3} />}
      {loginStatus === 2 && <Notification desc={2}/>}
    </div>
  );
};

export default LoginPage;
