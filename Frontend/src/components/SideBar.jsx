import { React, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import LoginIcon from "@mui/icons-material/Login"

const SideBar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.clear()
        setIsLoggedIn(false)
        navigate('/')
    }

    useEffect(() => {
        const storedUsername = localStorage.getItem('username')

        if (storedUsername) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }
    , [])

  return (
    <div className="h-full w-full bg-gray-800 shadow-lg rounded-r-lg flex flex-col items-center p-6">
      {/* Sidebar Title */}
      <h1 className="text-3xl font-bold text-white mb-4">Dashboard</h1>

      {/* Navigation Menu */}
      <nav className="w-full">
        <ul className="space-y-3 w-full">
          {[
            { name: "Home", path: "/" },
            { name: "Checkout", path: "/Checkout" },
            { name: "Market", path: "/Market" },
            { name: "Profile", path: "/Customer_Profile" },
          ].map((item, index) => (
            <li key={index} className="w-full">
              <Link to={item.path} className="block w-full text-lg font-medium text-gray-300 py-2 px-4 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-700 hover:text-white">
                {item.name}
              </Link>
            </li>
          ))}

          {/* Logout Button */}
          {isLoggedIn ?(
            <li className="w-full">
                <button className="flex items-center justify-between w-full text-lg font-medium text-red-400 py-2 px-4 rounded-lg transition-all duration-200 ease-in-out hover:bg-red-600 hover:text-white" onClick={handleLogout}>
                Log Out
                <ExitToAppIcon className="ml-2" />
                </button>
            </li>
          ):(
            <li className="w-full">
              <Link to="/Login_Page" className="flex items-center justify-between w-full text-lg font-medium text-green-400 py-2 px-4 rounded-lg transition-all duration-200 ease-in-out hover:bg-green-600 hover:text-white">
                Log In
                <LoginIcon className="ml-2" />
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
