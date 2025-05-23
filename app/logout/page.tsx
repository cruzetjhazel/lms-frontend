'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(true);

  const handleLogout = async () => {
    setShowConfirmation(false);
    setIsLoading(true);
    
    // Simulate logout process
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setShowSuccess(true);
    
    // Clear auth tokens or user data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    // Redirect after 3 seconds
    setTimeout(() => {
      router.replace('/');
    }, 3000);
  };

  const handleCancel = () => {
    router.back(); // Go back to previous page
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white text-[#6B3F08] px-8 py-4 rounded-xl shadow-lg z-50 flex items-center gap-3 border border-amber-100 backdrop-blur-sm bg-opacity-90 animate-fade-in">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium">Logout successful!</span>
        </div>
      )}

      {/* Background image*/}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/background2.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.9,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center p-8 bg-white bg-opacity-80 rounded-xl shadow-lg backdrop-blur-sm">
        {showConfirmation ? (
          <>
            <svg 
              className="w-16 h-16 mb-4 text-[#6B3F08]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <h1 className="text-3xl font-bold text-[#6B3F08] mb-4 text-center">
              Are you sure?
            </h1>
            <p className="text-gray-700 text-lg mb-6 text-center">
              Do you really want to logout from the system?
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleCancel}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-[#6B3F08] text-white rounded-xl hover:bg-amber-900 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Yes, Logout
              </button>
            </div>
          </>
        ) : isLoading ? (
          <>
            <svg 
              className="w-16 h-16 mb-4 text-[#6B3F08] animate-spin" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <h1 className="text-3xl font-bold text-[#6B3F08] mb-4 text-center">
              Logging out...
            </h1>
            <p className="text-gray-700 text-lg mb-6 text-center">
              Please wait while we securely log you out
            </p>
          </>
        ) : (
          <>
            <svg 
              className="w-16 h-16 mb-4 text-[#6B3F08]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
              />
            </svg>
            <h1 className="text-3xl font-bold text-[#6B3F08] mb-4 text-center">
              Goodbye!
            </h1>
            <p className="text-gray-700 text-lg mb-6 text-center">
              You have been successfully logged out.
            </p>
            <Link
              href="/"
              className="px-6 py-3 bg-[#6B3F08] text-white rounded-xl hover:bg-amber-900 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Back to Login
            </Link>
          </>
        )}
      </div>

      {/* Quote */}
      <p className="relative z-10 text-lg italic text-white mt-8 drop-shadow text-center max-w-md">
        "Thank you for using our Library Management System"
      </p>
    </div>
  );
}
