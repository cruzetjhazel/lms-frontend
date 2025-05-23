'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

export default function BorrowPage() {
  const [isAddRecordOpen, setIsAddRecordOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ show: boolean; recordId: number | null }>({
    show: false,
    recordId: null
  });
  const [viewRecord, setViewRecord] = useState<{ show: boolean; record: any | null }>({
    show: false,
    record: null
  });
  const [form, setForm] = useState({ user: '', book: '', category: '', date: '', status: 'Pending' });
  const [records, setRecords] = useState([
    { id: 1, user: 'Mae', book: 'The Great Gatsby', category: 'Borrow', date: '2025-05-20', status: 'Approved' },
  ]);
  const [lastId, setLastId] = useState(1); // Track last used ID
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ user: '', book: '', category: '', date: '', status: 'Pending' });
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  // Show success message helper
  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  // Add Record
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.user || !form.book || !form.category || !form.date) return;
    const newId = lastId + 1;
    const newRecord = { ...form, id: newId };
    setRecords([...records, newRecord]);
    setForm({ user: '', book: '', category: '', date: '', status: 'Pending' });
    setCurrentPage(1);
    setLastId(newId);
    setIsAddRecordOpen(false);
    showSuccess('Record added successfully!');
  };

  // Delete Record
  const handleDeleteClick = (id: number) => {
    setDeleteConfirmation({ show: true, recordId: id });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmation.recordId) {
      setRecords(records.filter((r) => r.id !== deleteConfirmation.recordId));
      showSuccess('Record deleted successfully!');
    }
    setDeleteConfirmation({ show: false, recordId: null });
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmation({ show: false, recordId: null });
  };

  // View Record
  const handleViewClick = (record: any) => {
    setViewRecord({ show: true, record });
  };

  const handleViewClose = () => {
    setViewRecord({ show: false, record: null });
  };

  // Edit Record
  const handleEditClick = (record: any) => {
    setEditingId(record.id);
    setEditForm({ 
      user: record.user, 
      book: record.book, 
      category: record.category, 
      date: record.date,
      status: record.status 
    });
  };

  const handleEditSave = (id: number) => {
    if (!editForm.user || !editForm.book || !editForm.category || !editForm.date) return;
    
    setRecords(records.map(record => 
      record.id === id 
        ? { ...record, ...editForm }
        : record
    ));
    setEditingId(null);
    showSuccess('Record updated successfully!');
  };

  const handleEditCancel = () => {
    setEditingId(null);
  };

  // Filtered and paginated data
  const filteredRecords = records.filter(
    (r) =>
      r.user.toLowerCase().includes(search.toLowerCase()) ||
      r.book.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase()) ||
      r.status.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / rowsPerPage));
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const emptyRows = rowsPerPage - paginatedRecords.length;

  const handlePrevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const handlePageClick = (page: number) => setCurrentPage(page);

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
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .dialog-animation {
          animation: slideIn 0.3s ease-out forwards;
        }
        .overlay-animation {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      <Header />
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out">
          <div className="flex items-center space-x-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      {/* Add Record Dialog */}
      {isAddRecordOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg dialog-animation">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add New Record</h3>
              <button
                onClick={() => setIsAddRecordOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="User"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  value={form.user}
                  onChange={(e) => setForm({ ...form, user: e.target.value })}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Book"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  value={form.book}
                  onChange={(e) => setForm({ ...form, book: e.target.value })}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Category"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                />
              </div>
              <div>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsAddRecordOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
                >
                  Add Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmation.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Confirmation</h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete this record? This action cannot be undone.
              </p>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={handleDeleteCancel}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-700 transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Record Dialog */}
      {viewRecord.show && viewRecord.record && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 overlay-animation">
          <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg dialog-animation">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-light text-gray-800">Record Details</h3>
              <button
                onClick={handleViewClose}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-[100px,1fr] items-center">
                <div className="text-gray-400 text-sm">User</div>
                <div className="text-gray-700 font-light">{viewRecord.record.user}</div>
              </div>
              <div className="grid grid-cols-[100px,1fr] items-center">
                <div className="text-gray-400 text-sm">Book</div>
                <div className="text-gray-700 font-light">{viewRecord.record.book}</div>
              </div>
              <div className="grid grid-cols-[100px,1fr] items-center">
                <div className="text-gray-400 text-sm">Category</div>
                <div className="text-gray-700 font-light">{viewRecord.record.category}</div>
              </div>
              <div className="grid grid-cols-[100px,1fr] items-center">
                <div className="text-gray-400 text-sm">Date</div>
                <div className="text-gray-700 font-light">{viewRecord.record.date}</div>
              </div>
              <div className="grid grid-cols-[100px,1fr] items-center">
                <div className="text-gray-400 text-sm">Status</div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    viewRecord.record.status === 'Approved' 
                      ? 'bg-green-50 text-green-600'
                      : viewRecord.record.status === 'Pending'
                      ? 'bg-yellow-50 text-yellow-600'
                      : 'bg-red-50 text-red-600'
                  }`}>
                    {viewRecord.record.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleViewClose}
                className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors duration-200"
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
              <h3 className="text-xl font-semibold text-[#834F3B]">Edit Borrow Record</h3>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">User</label>
                <input
                  type="text"
                  value={editForm.user}
                  onChange={(e) => setEditForm({ ...editForm, user: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#834F3B] focus:ring-2 focus:ring-amber-100 transition-all duration-200"
                  placeholder="Enter user name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Book</label>
                <input
                  type="text"
                  value={editForm.book}
                  onChange={(e) => setEditForm({ ...editForm, book: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#834F3B] focus:ring-2 focus:ring-amber-100 transition-all duration-200"
                  placeholder="Enter book title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#834F3B] focus:ring-2 focus:ring-amber-100 transition-all duration-200"
                  required
                >
                  <option value="">Select category</option>
                  <option value="Borrow">Borrow</option>
                  <option value="Return">Return</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={editForm.date}
                  onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#834F3B] focus:ring-2 focus:ring-amber-100 transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#834F3B] focus:ring-2 focus:ring-amber-100 transition-all duration-200"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
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
                className="px-4 py-2 bg-[#834F3B] text-white rounded-lg hover:bg-amber-900 transition-all duration-200"
              >
                Save Changes
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
                  Borrow Books Record
                </h2>
                <div className="h-1 w-32 bg-gradient-to-r from-amber-900 to-[#834F3B] rounded-full mt-2"></div>
              </div>
              <button
                onClick={() => setIsAddRecordOpen(true)}
                className="bg-[#834F3B] text-white px-6 py-2.5 rounded-xl hover:bg-amber-900 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                + Add Record
              </button>
            </div>

            {/* Search Bar with softer edges */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by user, book, category, or status..."
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

            {/* Table with softer edges */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedRecords.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{r.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {editingId === r.id ? (
                          <input
                            value={editForm.user}
                            onChange={(e) => setEditForm({ ...editForm, user: e.target.value })}
                            className="border border-gray-200 rounded-lg p-1 w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                          />
                        ) : (
                          r.user
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {editingId === r.id ? (
                          <input
                            value={editForm.book}
                            onChange={(e) => setEditForm({ ...editForm, book: e.target.value })}
                            className="border border-gray-200 rounded-lg p-1 w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                          />
                        ) : (
                          r.book
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {editingId === r.id ? (
                          <input
                            value={editForm.category}
                            onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                            className="border border-gray-200 rounded-lg p-1 w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                          />
                        ) : (
                          r.category
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {editingId === r.id ? (
                          <input
                            type="date"
                            value={editForm.date}
                            onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                            className="border border-gray-200 rounded-lg p-1 w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                          />
                        ) : (
                          r.date
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          r.status === 'Approved' 
                            ? 'bg-green-50 text-green-600'
                            : r.status === 'Pending'
                            ? 'bg-yellow-50 text-yellow-600'
                            : 'bg-red-50 text-red-600'
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <div className="flex space-x-2 justify-center">
                          {editingId === r.id ? (
                            <>
                              <button
                                onClick={() => handleEditSave(r.id)}
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
                                onClick={() => handleViewClick(r)}
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
                                onClick={() => handleEditClick(r)}
                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1.5 rounded-full text-xs flex items-center transition-all duration-200 transform hover:scale-105"
                                title="Edit Record"
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteClick(r.id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full text-xs flex items-center transition-all duration-200 transform hover:scale-105"
                                title="Delete Record"
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
                  {emptyRows > 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <div className="h-[${emptyRows * 53}px]"></div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination with updated styling */}
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
