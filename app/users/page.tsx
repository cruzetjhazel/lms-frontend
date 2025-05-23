'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

export default function UsersPage() {
  
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [form, setForm] = useState({ name: '', email: '', role: '', status: 'Active' });
  const [users, setUsers] = useState([
    { id: 1, name: 'Mae', email: 'mae@email.com', role: 'Admin', status: 'Active' },
  ]);
  const [lastId, setLastId] = useState(1);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: '', status: 'Active' });
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ show: boolean; recordId: number | null }>({
    show: false,
    recordId: null
  });
  const [viewRecord, setViewRecord] = useState<{ show: boolean; record: any | null }>({
    show: false,
    record: null
  });

  // Add User
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.role) return;
    const newId = lastId + 1;
    const newUser = { ...form, id: newId };
    setUsers([...users, newUser]);
    setForm({ name: '', email: '', role: '', status: 'Active' });
    setCurrentPage(1);
    setLastId(newId);
    setIsAddUserOpen(false);
    setSuccessMessage('User added successfully!');
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  // Delete User
  const handleDeleteClick = (id: number) => {
    setDeleteConfirmation({ show: true, recordId: id });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmation.recordId) {
      setUsers(users.filter((user) => user.id !== deleteConfirmation.recordId));
      setDeleteConfirmation({ show: false, recordId: null });
      setSuccessMessage('User deleted successfully!');
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmation({ show: false, recordId: null });
  };

  // View User
  const handleView = (user: any) => {
    setViewRecord({ show: true, record: user });
  };

  const handleViewClose = () => {
    setViewRecord({ show: false, record: null });
  };

  // Edit User
  const handleEditClick = (user: any) => {
    setEditingId(user.id);
    setEditForm({ name: user.name, email: user.email, role: user.role, status: user.status });
  };

  const handleEditSave = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, ...editForm } : user
      )
    );
    setEditingId(null);
    setSuccessMessage('User updated successfully!');
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleEditCancel = () => {
    setEditingId(null);
  };

  // Filtered and paginated data
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase()) ||
      u.status.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / rowsPerPage));
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const emptyRows = rowsPerPage - paginatedUsers.length;

  const handlePrevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const handlePageClick = (page: number) => setCurrentPage(page);

  return (
    <>
      <style jsx>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
        .animate-fade-in-out {
          animation: fadeInOut 3s ease-in-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .overlay-animation {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
      <Header />
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-white text-[#6B3F08] px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out border border-amber-100 backdrop-blur-sm bg-opacity-90">
          <div className="flex items-center space-x-2">
            <svg className="w-6 h-6 text-[#6B3F08]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="font-medium">{successMessage}</span>
          </div>
        </div>
      )}

      {/* View User Dialog */}
      {viewRecord.show && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 overlay-animation">
          <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg dialog-animation">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-[#834F3B]">User Details</h3>
              <button
                onClick={handleViewClose}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-[100px,1fr] gap-3 items-center">
                <div className="text-gray-400 text-sm">Name</div>
                <div className="text-gray-700">{viewRecord.record?.name}</div>
              </div>
              <div className="grid grid-cols-[100px,1fr] gap-3 items-center">
                <div className="text-gray-400 text-sm">Email</div>
                <div className="text-gray-700">{viewRecord.record?.email}</div>
              </div>
              <div className="grid grid-cols-[100px,1fr] gap-3 items-center">
                <div className="text-gray-400 text-sm">Role</div>
                <div className="text-gray-700">{viewRecord.record?.role}</div>
              </div>
              <div className="grid grid-cols-[100px,1fr] gap-3 items-center">
                <div className="text-gray-400 text-sm">Status</div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    viewRecord.record?.status === 'Active' 
                      ? 'bg-green-50 text-green-600'
                      : 'bg-red-50 text-red-600'
                  }`}>
                    {viewRecord.record?.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleViewClose}
                className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Dialog */}
      {editingId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 overlay-animation">
          <div className="bg-white rounded-xl p-6 w-[500px] shadow-lg dialog-animation">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-[#834F3B]">Edit User</h3>
              <button
                onClick={handleEditCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#834F3B] focus:ring-2 focus:ring-amber-100 transition-all duration-200"
                  placeholder="Enter name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#834F3B] focus:ring-2 focus:ring-amber-100 transition-all duration-200"
                  placeholder="Enter email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#834F3B] focus:ring-2 focus:ring-amber-100 transition-all duration-200"
                  required
                >
                  <option value="">Select role</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#834F3B] focus:ring-2 focus:ring-amber-100 transition-all duration-200"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleEditCancel}
                className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleEditSave(editingId)}
                className="px-4 py-2 bg-[#834F3B] text-white rounded-lg hover:bg-amber-900 transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmation.show && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 overlay-animation">
          <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg dialog-animation">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-light text-gray-800">Confirm Delete</h3>
              <button
                onClick={handleDeleteCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mb-6">
              <p className="text-gray-600">Are you sure you want to delete this user? This action cannot be undone.</p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200"
              >
                Delete
              </button>
            </div>
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
                  Library Users
                </h2>
                <div className="h-1 w-32 bg-gradient-to-r from-amber-900 to-[#834F3B] rounded-full mt-2"></div>
              </div>
              <button
                onClick={() => setIsAddUserOpen(true)}
                className="bg-[#834F3B] text-white px-6 py-2.5 rounded-xl hover:bg-amber-900 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                + Add User
              </button>
            </div>

            {/* Search Bar with softer edges */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, email, role, or status..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Add User Dialog */}
            {isAddUserOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 overlay-animation">
                <div className="bg-white rounded-xl p-6 w-[500px] shadow-lg dialog-animation">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-[#834F3B]">Add New User</h3>
                    <button
                      onClick={() => setIsAddUserOpen(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <form onSubmit={handleAdd} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#834F3B] focus:ring-2 focus:ring-amber-100 transition-all duration-200"
                        placeholder="Enter name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#834F3B] focus:ring-2 focus:ring-amber-100 transition-all duration-200"
                        placeholder="Enter email"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <select
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#834F3B] focus:ring-2 focus:ring-amber-100 transition-all duration-200"
                        required
                      >
                        <option value="">Select role</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={form.status}
                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#834F3B] focus:ring-2 focus:ring-amber-100 transition-all duration-200"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                      <button
                        type="button"
                        onClick={() => setIsAddUserOpen(false)}
                        className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#834F3B] text-white rounded-lg hover:bg-amber-900 transition-all duration-200"
                      >
                        Add User
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Table with softer edges */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{u.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {editingId === u.id ? (
                          <input
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className="border border-gray-200 rounded-lg p-1 w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                          />
                        ) : (
                          u.name
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{u.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{u.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          u.status === 'Active' 
                            ? 'bg-green-50 text-green-600'
                            : 'bg-red-50 text-red-600'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <div className="flex space-x-2 justify-center">
                          {editingId === u.id ? (
                            <>
                              <button
                                onClick={() => handleEditSave(u.id)}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-full text-xs flex items-center transition-all duration-200"
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Save
                              </button>
                              <button
                                onClick={handleEditCancel}
                                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1.5 rounded-full text-xs flex items-center transition-all duration-200"
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleView(u)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs flex items-center transition-all duration-200 transform hover:scale-105"
                                title="View Details"
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                View
                              </button>
                              <button
                                onClick={() => handleEditClick(u)}
                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1.5 rounded-full text-xs flex items-center transition-all duration-200 transform hover:scale-105"
                                title="Edit User"
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteClick(u.id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full text-xs flex items-center transition-all duration-200 transform hover:scale-105"
                                title="Delete User"
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border"
                style={{
                  backgroundColor: currentPage === 1 ? '#e5e7eb' : '#834F3B',
                  color: currentPage === 1 ? '#888' : '#fff',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  borderColor: '#834F3B',
                }}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageClick(i + 1)}
                  className="px-3 py-1 rounded border"
                  style={{
                    backgroundColor: currentPage === i + 1 ? '#834F3B' : '#fff',
                    color: currentPage === i + 1 ? '#fff' : '#834F3B',
                    borderColor: '#834F3B',
                  }}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-3 py-1 rounded border"
                style={{
                  backgroundColor: currentPage === totalPages || totalPages === 0 ? '#e5e7eb' : '#834F3B',
                  color: currentPage === totalPages || totalPages === 0 ? '#888' : '#fff',
                  cursor: currentPage === totalPages || totalPages === 0 ? 'not-allowed' : 'pointer',
                  borderColor: '#834F3B',
                }}
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
