import React from 'react';

function Header() {
  return (
    <div className="flex justify-between items-center px-5 py-3 bg-gray-100">
      {/* Logo and Sign In Button in Same Line */}
      <div className="flex items-center gap-4">
        <img src="/vite.svg" alt="Logo" className="w-10 h-auto" />

        <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Header;

