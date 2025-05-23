'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);
  const [userData, setUserData] = useState<{ username: string; role: string; email: string } | null>(null);

  useEffect(() => {
    // Get user data from localStorage on component mount
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        setUserData(JSON.parse(storedUserData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        // If there's an error, clear the invalid data
        localStorage.removeItem('userData');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('authToken');
    router.push('/');
  };

  // If no user data is found, don't render the profile section
  if (!userData) {
    return (
      <header className="w-full py-3 shadow" style={{ backgroundColor: '#190F05' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
          <h1 className="text-sm font-bold tracking-wide text-center text-white">
            Library Management System
          </h1>
        </div>
      </header>
    );
  }

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
                {userData.username.charAt(0)}
              </span>
            </div>
            <span className="text-sm font-medium">{userData.username}</span>
          </button>

          {showProfile && (
            <div 
              className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-3 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 pb-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{userData.username}</p>
                <p className="text-xs text-gray-500 mt-1">{userData.role}</p>
                <p className="text-xs text-gray-500 mt-1">{userData.email}</p>
              </div>
              <div className="pt-2">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}