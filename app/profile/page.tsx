'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<{ username: string; role: string; email: string } | null>(null);

  useEffect(() => {
    // Get user data from localStorage on component mount
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        setUserData(JSON.parse(storedUserData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [router]);

  if (!userData) {
    return null; // or a loading spinner
  }

  return (
    <div
      className="flex min-h-screen"
      style={{
        backgroundColor: '#F8F6F5',
        backgroundImage: "url('/background2.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Sidebar />
      <main className="flex-1 p-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-900 to-[#834F3B] bg-clip-text text-transparent">
              Profile
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-amber-900 to-[#834F3B] rounded-full mt-2"></div>
          </div>

          <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-8">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600">
                {userData.username.charAt(0)}
              </div>
              <div className="ml-6">
                <h2 className="text-2xl font-bold text-gray-800">{userData.username}</h2>
                <p className="text-gray-600">{userData.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                  {userData.role}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
                  <input
                    type="text"
                    value={userData.username}
                    disabled
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    value={userData.email}
                    disabled
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Role</label>
                  <input
                    type="text"
                    value={userData.role}
                    disabled
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 