import React, { useEffect, useState } from 'react'
import '../css/header.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import profileIcon from '../assets/HeaderAssets/profile-icon.png'

const Header = (props) => {

  const user_id = localStorage.getItem('user_id');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState(false);

  useEffect(()=>{
    const storedUsername = localStorage.getItem('username');

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    } else {
      setIsLoggedIn(false);
    }
  },[]);

  function handleLogout() {
    localStorage.clear()
    setIsLoggedIn(false)
    navigate('/')
  
  }

  function handleDropDown() {
    setDropDown(!dropDown);
    console.log(dropDown);
    
  }

  const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.slice(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

  return (
    <div>

          {/* navigation bar */}
          <div id="nav_bar" className="flex flex-row justify-between content-center items-center text-center bg-sky-950 text-white p-4">

            {/* Title*/}
            <div id="dealership_name" className="flex justify-start text-3xl font-extrabold">
              <h1 className="">{props.title}</h1>
            </div>

            {/* Navigation buttons */}
            <div id="navigationBtns" className="">
              <ul className="flex flex-row justify-start gap-6 text-2xl">
                <li className="hover:text-sky-600 hover:underline cursor-pointer"><Link to='/' >Home</Link></li>
                <li className="hover:text-sky-600 hover:underline cursor-pointer"><Link to='/#aboutUs'>About</Link></li>
                <li className="hover:text-sky-600 hover:underline cursor-pointer"><Link to='/Market'>Market</Link></li>
                <li className="hover:text-sky-600 hover:underline cursor-pointer"><Link to='/Cars_For_Sale_Or_Rent'>Gallery</Link></li>
                <li className="hover:text-sky-600 hover:underline cursor-pointer"><Link to='/Parts'>Parts</Link></li>
                <li className="hover:text-sky-600 hover:underline cursor-pointer"><Link to='/Repairs'>Repairs</Link></li>
              </ul>
            </div>
            
            

            {/* Log and Sign in buttons */}
            <div id="login_or_signin" className="flex flex-row justify-center object-center text-center content-center">
              
              {/* Check if the user is logged in */}
              {isLoggedIn ? (
                // Case 1, true. Display profile icon instead of the log in button
                <div className='relative'>
                  <img onClick={handleDropDown} src={profileIcon} alt="" className="cursor-pointer"/>
                  
                  {/* In case the user decides to logout, check they click their profile */}
                  {dropDown && (
                    <div>
                      {
                        (user_id != undefined) ? (
                          <div className="flex flex-col justify-start absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg">
                            <Link to="/Customer_Profile" className="text-start px-4 py-2 text-gray-700 hover:bg-gray-100">View Profile</Link>
                            <div className='w-[90%] h-[2px] mx-auto bg-sky-700'></div>
                            <button onClick={handleLogout} className="block w-full text-left px-4 pb-2 pt-1 text-gray-700 hover:bg-gray-100">Log Out</button>
                          </div>
                        ) : (user_id === '-1') (
                          <div className="flex flex-col justify-start absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg">
                            <Link to="/Admin_Pannel" className="text-start px-4 py-2 text-gray-700 hover:bg-gray-100">View Profile</Link>
                            <div className='w-[90%] h-[2px] mx-auto bg-sky-700'></div>
                            <button onClick={handleLogout} className="block w-full text-left px-4 pb-2 pt-1 text-gray-700 hover:bg-gray-100">Log Out</button>
                          </div>
                        )}
                        {/* : (user_id == undefined) (
                          <div className="flex flex-col justify-start absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg">
                            <Link to="/Employee_Profile" className="text-start px-4 py-2 text-gray-700 hover:bg-gray-100">View Profile</Link>
                            <div className='w-[90%] h-[2px] mx-auto bg-sky-700'></div>
                            <button onClick={handleLogout} className="block w-full text-left px-4 pb-2 pt-1 text-gray-700 hover:bg-gray-100">Log Out</button>
                          </div>
                        ) */}
                      
                      {/* <Link to="/profile" className="text-start px-4 py-2 text-gray-700 hover:bg-gray-100">View Profile</Link>
                      <div className='w-[90%] h-[2px] mx-auto bg-sky-700'></div>
                      <button onClick={handleLogout} className="block w-full text-left px-4 pb-2 pt-1 text-gray-700 hover:bg-gray-100">Log Out</button> */}
                    </div>
                  )}

                </div>

              //  Case 1 over, then to case 2
               ):(
                // Here, the user is not logged in. So, display the log in button
               <Link to="/Login_Page" id="log_in" className="cursor-pointer transition-all bg-sky-600 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">Log In</Link>)}
            </div>
          </div>
    </div>
  )
}

export default Header
