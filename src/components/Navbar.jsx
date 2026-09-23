import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import imge from './imge.jpg';  
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-2xl font-bold">MyWebsite</h1>

      {/* Public Navigation Links */}
      <ul className="flex space-x-6">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/services">Services</Link></li>
      </ul>

      {/* Right Section */}
      <div className="relative flex items-center space-x-4">
        {user ? (
          <>
            {/* Profile Icon */}
            <img 
              src={user?.photoUrl || imge} 
              alt={`Profile photo of ${user?.name}`} 
              className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
              onClick={() => setOpen(!open)}
            />
            <div className="flex flex-col text-sm">
              <span>Welcome</span>
              <span className="font-semibold block">
                {user?.firstName} {user?.lastName}
              </span>
            </div>

            {/* Dropdown Menu */}
            {open && (
              <div className="absolute right-0 top-12 bg-white text-black rounded shadow-lg w-40">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
                <Link to="/contact" className="block px-4 py-2 hover:bg-gray-200">Contact</Link>
                <Link to="/connections" className="block px-4 py-2 hover:bg-gray-200">Connections</Link>
                <button 
                  onClick={handleLogout} 
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <Link to="/login">
            <button className="bg-white text-blue-600 px-4 py-2 rounded">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
