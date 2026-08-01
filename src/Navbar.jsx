import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">MyWebsite</h1>

        <ul className="flex space-x-6">
          <li><a href="/">Home</a></li>
          <li><a href="/">About</a></li>
          <li><a href="/">Services</a></li>
          <li><a href="/">Contact</a></li>
        </ul>

        <button className="bg-white text-blue-600 px-4 py-2 rounded">
          Sign In
        </button>
      </nav>
      
    </div>
  )
}

export default Navbar
 