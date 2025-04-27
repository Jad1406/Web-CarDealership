import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import profileIcon from '../assets/HeaderAssets/profile-icon.png';

const Header = ({ title }) => {
  const user_id = localStorage.getItem('user_id');
  const storedUsername = localStorage.getItem('username');
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(!!storedUsername);
  const [dropDown, setDropDown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const dropdownRef = useRef(null);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleDropDown = () => setDropDown(!dropDown);
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <header className="bg-sky-950 text-white dark:bg-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-wide">{title}</h1>

        <nav className="hidden md:flex items-center gap-6 text-lg font-semibold">
          <Link className="hover:text-sky-400 transition" to="/">Home</Link>
          <Link className="hover:text-sky-400 transition" to="/#aboutUs">About</Link>
          <Link className="hover:text-sky-400 transition" to="/Market">Market</Link>
          <Link className="hover:text-sky-400 transition" to="/Cars_For_Sale_Or_Rent">Gallery</Link>
          <Link className="hover:text-sky-400 transition" to="/Parts">Parts</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={toggleDarkMode} className="text-xl transition hover:text-yellow-400">
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>

          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <img
                onClick={toggleDropDown}
                src={profileIcon}
                alt="profile"
                className="w-9 h-9 rounded-full cursor-pointer border border-white hover:brightness-110 transition"
              />
              {dropDown && (
                <div className="absolute right-0 mt-2 w-44 bg-white text-black border rounded-md shadow-lg z-50">
                  <Link
                    to={user_id === '-1' ? '/Admin_Pannel' : '/Customer_Profile'}
                    className="block px-4 py-2 font-medium hover:bg-gray-100"
                  >
                    View Profile
                  </Link>
                  <hr className="border-sky-700 my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 font-medium hover:bg-gray-100"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/Login_Page"
              className="bg-sky-600 hover:bg-sky-500 px-5 py-2 rounded-md text-white font-bold text-base transition"
            >
              Log In
            </Link>
          )}

          <button className="md:hidden" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden px-4 pb-4 flex flex-col gap-2 text-base font-semibold bg-sky-900 dark:bg-gray-800">
          <Link onClick={() => setMobileMenuOpen(false)} to="/">Home</Link>
          <Link onClick={() => setMobileMenuOpen(false)} to="/#aboutUs">About</Link>
          <Link onClick={() => setMobileMenuOpen(false)} to="/Market">Market</Link>
          <Link onClick={() => setMobileMenuOpen(false)} to="/Cars_For_Sale_Or_Rent">Gallery</Link>
          <Link onClick={() => setMobileMenuOpen(false)} to="/Parts">Parts</Link>
          <Link onClick={() => setMobileMenuOpen(false)} to="/Repairs">Repairs</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
