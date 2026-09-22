import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import imge from './imge.jpg';  
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';  // import removeUser action
const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());       // clear Redux state
      navigate("/login");           // redirect to login
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-2xl font-bold">MyWebsite</h1>

      {/* Navigation Links */}
      <ul className="flex space-x-6">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/services">Services</Link></li>
        {user && <li><Link to="/contact">Contact</Link></li>}
        {user && <li><Link to="/Profile">Profile</Link></li>}
        {user && (
          <li>
            <button 
              onClick={handleLogout} 
              className="text-white hover:underline cursor-pointer bg-transparent"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <img 
              src={user?.photoUrl || imge} 
              alt={`Profile photo of ${user?.name}`} 
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div className="flex flex-col text-sm">
              <span>Welcome</span>
              <span className="font-semibold block">
                {user?.firstName} {user?.lastName}
              </span>
            </div>
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
