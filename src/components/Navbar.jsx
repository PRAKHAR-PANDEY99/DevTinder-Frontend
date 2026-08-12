import React from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";   // ✅ import Link
import imge from './imge.jpg';             // fallback image

const Navbar = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">MyWebsite</h1>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/services">Services</Link></li>
          {user && <li><Link to="/contact">Contact</Link></li>}
          {user && <li><Link to="/profile">Profile</Link></li>} {/* ✅ Profile link */}
        </ul>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {/* Profile Photo */}
              <img 
                src={user?.photoUrl || imge} 
                alt={`Profile photo of ${user.name}`} 
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              {/* Welcome Message */}
              <p className="text-sm">Welcome, {user.name}</p>
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
    </div>
  );
};

export default Navbar;
