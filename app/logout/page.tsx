'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear auth tokens or user data here (example: localStorage)
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    // Optionally, you can auto-redirect after a delay
    // setTimeout(() => router.replace('/'), 1500);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <p className="text-gray-700 text-lg mb-4">You have been logged out.</p>
      <Link
        href="/"
        className="px-4 py-2 bg-[#331C05] text-white rounded hover:bg-[#62370C] transition"
      >
        Go to Login
      </Link>
    </div>
  );
}
