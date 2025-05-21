'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear auth tokens or user data here (example: localStorage)
    localStorage.removeItem('authToken'); // or whatever key you use
    localStorage.removeItem('userData');

    // Redirect to login page after logout
    router.replace('/login');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-gray-700 text-lg">Logging out...</p>
    </div>
  );
}
