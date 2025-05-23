'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    joinDate: '2024-01-01',
    booksIssued: 2,
    booksReturned: 15
  });
  const [editForm, setEditForm] = useState({ ...profile });

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm({ ...profile });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({ ...editForm });
    setIsEditing(false);
    setSuccessMessage('Profile updated successfully!');
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({ ...profile });
  };

  return (
    <>
      <style jsx>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(-20px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-20px); }
        }
        .animate-fade-in-out {
          animation: fadeInOut 3s ease-in-out forwards;
        }
      `}</style>
      <Header />
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-white text-[#6B3F08] px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out border border-amber-100 backdrop-blur-sm bg-opacity-90">
          <div className="flex items-center space-x-2">
            <svg className="w-6 h-6 text-[#6B3F08]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="font-medium">{successMessage}</span>
          </div>
        </div>
      )}

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
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-900 to-[#834F3B] bg-clip-text text-transparent">
                  My Profile
                </h2>
                <div className="h-1 w-32 bg-gradient-to-r from-amber-900 to-[#834F3B] rounded-full mt-2"></div>
              </div>
              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="bg-[#834F3B] text-white px-6 py-2.5 rounded-xl hover:bg-amber-900 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Edit Profile
                </button>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8">
              {isEditing ? (
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#834F3B] focus:ring-2 focus:ring-amber-100 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#834F3B] focus:ring-2 focus:ring-amber-100 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#834F3B] text-white rounded-lg hover:bg-amber-900 transition-all duration-200"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Name</h3>
                        <p className="mt-1 text-lg text-gray-900">{profile.name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Email</h3>
                        <p className="mt-1 text-lg text-gray-900">{profile.email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Role</h3>
                        <span className="mt-1 inline-block px-3 py-1 rounded-full text-sm font-medium bg-amber-50 text-amber-800">
                          {profile.role}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Join Date</h3>
                        <p className="mt-1 text-lg text-gray-900">{profile.joinDate}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Books Currently Issued</h3>
                        <p className="mt-1 text-lg text-gray-900">{profile.booksIssued}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Total Books Returned</h3>
                        <p className="mt-1 text-lg text-gray-900">{profile.booksReturned}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Returned "The Great Gatsby" - 2 days ago
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Borrowed "1984" - 5 days ago
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 