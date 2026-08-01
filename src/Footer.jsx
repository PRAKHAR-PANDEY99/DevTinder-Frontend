import React from 'react'

const Footer = () => {
  return (
    <div> 
    <footer className="bg-gray-900 text-gray-300 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left side */}
        <p className="text-sm">© 2026 MyWebsite. All rights reserved.</p>

        {/* Right side links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="/privacy" className="hover:text-white">Privacy</a>
          <a href="/terms" className="hover:text-white">Terms</a>
          <a href="/contact" className="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
    </div>
  );
}
export default Footer
