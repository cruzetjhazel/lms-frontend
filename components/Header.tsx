'use client';

import { useState } from 'react';

export default function Header() {
  const [showProfile, setShowProfile] = useState(false);
  const username = "Admin User"; // This could later be fetched from authentication state

  return (
    <header className="w-full py-3 shadow" style={{ backgroundColor: '#190F05' }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        <h1 className="text-sm font-bold tracking-wide text-center text-white">
          Library Management System
        </h1>

        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-800">
                {username.charAt(0)}
              </span>
            </div>
            <span className="text-sm font-medium">{username}</span>
          </button>

          {showProfile && (
            <div 
              className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-3 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4">
                <p className="text-sm font-medium text-gray-900">{username}</p>
                <p className="text-xs text-gray-500 mt-1">Administrator</p>
                <p className="text-xs text-gray-500 mt-1">admin@library.com</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}