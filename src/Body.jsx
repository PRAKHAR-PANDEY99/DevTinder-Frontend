import React from 'react'
import Navbar from "./Navbar";
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Body = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at the top */}
      <Navbar />

      {/* Page content */}
      <main className="flex-grow p-6">
        <Outlet />
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  )
}

export default Body;
