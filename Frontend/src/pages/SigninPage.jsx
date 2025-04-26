import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../components/Notification'; // Adjust the path if needed
import '../css/signinPage.css';

const SigninPage = () => {
  const [formUsername, setFormUsername] = useState("");
  const [formFirstName, setFormFirstName] = useState("");
  const [formLastName, setFormLastName] = useState("");
  const [formPhoneNumber, setFormPhoneNumber] = useState(0);
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formPasswordCheck, setFormPasswordCheck] = useState("");
  const [signupStatus, setSignupStatus] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formPassword !== formPasswordCheck) {
      setSignupStatus(8);
      return;
    }

    const formData = {
      first_name: formFirstName,
      last_name: formLastName,
      username: formUsername,
      user_email: formEmail,
      user_password: formPassword,
      user_phone: formPhoneNumber,
    };

    try {
      let result = await fetch('http://localhost:9000/api/users', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-type': 'application/json',
        },
      });
      result = await result.json();

      if (result.message === 'Email already exists') {
        setSignupStatus(5);
      } else if (result.message === 'Username already in use') {
        setSignupStatus(4);
      } else if (result.message === 'User created successfully') {
        setSignupStatus(1); //changed from 1 to 9
        localStorage.setItem('user_id', result.user_id);
        localStorage.setItem('username', result.username);
        navigate('/');
      } else {
        setSignupStatus(2);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setSignupStatus(2);
    }
  };

  useEffect(() => {
    if (signupStatus !== 0) {
      const timer = setTimeout(() => {
        setSignupStatus(0);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [signupStatus]);

  return (
    <div id='container' className="container flex flex-column justify-center items-center bg-slate-300 min-w-full min-h-screen">
      <div className='w-4/12 rounded-lg shadow-sky-800 h-auto p-6 bg-white relative overflow-hidden'>
        <Link to={'/'}><button className="cursor-pointer duration-200 hover:scale-125 active:scale-100" title="Go Back">
          <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" className="stroke-blue-300">
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M11 6L5 12M5 12L11 18M5 12H19"></path>
          </svg>
        </button></Link>

        <form action="" onSubmit={handleSubmit} className='flex flex-col justify-between m-auto w-full mt-4 space-y-10'>
          <div className="flex flex-col justify-center items-center space-y-2">
            <h2 className="text-2xl font-medium text-slate-700">Sign Up</h2>
            <p className="text-slate-500">Join Us Today!</p>
          </div>

          <div id="inputs" className='space-y-3'>
            <input
              className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
              name="text"
              required
              placeholder="Username"
              type="text"
              onBlur={(e) => { setFormUsername(e.target.value) }}
            />

            <div id="firstAndLastName" className='flex flex-row justify-between gap-4'>
              <input
                className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
                name="text"
                required
                placeholder="First name"
                type="text"
                onBlur={(e) => { setFormFirstName(e.target.value) }}
              />
              <input
                className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
                name="text"
                required
                placeholder="Last name"
                type="text"
                onBlur={(e) => { setFormLastName(e.target.value) }}
              />
            </div>

            <input
              className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
              name="text"
              required
              placeholder="Phone Number"
              type="text"
              onBlur={(e) => { setFormPhoneNumber(e.target.value) }}
            />
            <input
              className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
              name="text"
              required
              placeholder="Email or Username"
              type="text"
              onBlur={(e) => { setFormEmail(e.target.value) }}
            />
            <input
              className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
              name="text"
              required
              placeholder="Password"
              type="password"
              onBlur={(e) => { setFormPassword(e.target.value) }}
            />
            <input
              className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
              name="text"
              required
              placeholder="Re-enter Password"
              type="password"
              onBlur={(e) => { setFormPasswordCheck(e.target.value) }}
            />
          </div>

          <div id="bottomPart" className='flex flex-row justify-between items-center'>
            <p className='hover:text-blue-500 text-sky-700 hover:underline'>Have an account? <Link to={'/login_Page'}>Log in!</Link></p>
            <button className='w-2/5 justify-center py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2' type='Submit'>Create Account</button>
          </div>
        </form>
      </div>
      {signupStatus === 1 && <Notification desc={1} />}
      {signupStatus === 4 && <Notification desc={4} />}
      {signupStatus === 5 && <Notification desc={5} />}
      {signupStatus === 8 && <Notification desc={8} />}
      {signupStatus === 9 && <Notification desc={1} />} {/* Changed to 9 */}
      {signupStatus === 2 && <Notification desc={2}/>}
    </div>
  );
};

export default SigninPage;