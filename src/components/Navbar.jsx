import React from 'react';
import { useSelector } from "react-redux";
import imge from './imge.jpg';   // ✅ import from src

const Navbar = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">MyWebsite</h1>

        <ul className="flex space-x-6">
          <li><a href="/">Home</a></li>
          <li><a href="/">About</a></li>
          <li><a href="/">Services</a></li>
          {user && <li><a href="/">Contact</a></li>}
        </ul>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {/* Profile Photo */}
              <img 
                src={user?.photoUrl || imge}   // ✅ fallback to local image
                alt={`Profile photo of ${user.name}`} 
                className="w-10 h-10 rounded-full border-2 border-white"
              />

              <p className="text-sm">Welcome, {user.name}</p>
            </>
          ) : (
            <button className="bg-white text-blue-600 px-4 py-2 rounded">
              Sign In
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
