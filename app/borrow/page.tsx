'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

export default function BorrowPage() {
  const [form, setForm] = useState({ user: '', book: '', type: '', date: '', status: 'Pending' });
  const [records, setRecords] = useState([
    { id: 1, user: 'Mae', book: 'The Great Gatsby', type: 'Borrow', date: '2025-05-20', status: 'Approved' },
  ]);
  const [lastId, setLastId] = useState(1); // Track last used ID
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ user: '', book: '', type: '', date: '' });
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  // Add Record
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.user || !form.book || !form.type || !form.date) return;
    const newId = lastId + 1;
    const newRecord = { ...form, id: newId };
    setRecords([...records, newRecord]); // Add to the end
    setForm({ user: '', book: '', type: '', date: '', status: 'Pending' });
    setCurrentPage(1);
    setLastId(newId);
  };

  // Delete Record
  const handleDelete = (id: number) => {
    setRecords(records.filter((r) => r.id !== id));
  };

  // View Record
  const handleView = (r: any) => {
    alert(
      `User: ${r.user}\nBook: ${r.book}\nType: ${r.type}\nDate: ${r.date}\nStatus: ${r.status}`
    );
  };

  // Edit Record
  const handleEditClick = (r: any) => {
    setEditingId(r.id);
    setEditForm({ user: r.user, book: r.book, type: r.type, date: r.date });
  };

  const handleEditSave = (id: number) => {
    setRecords(
      records.map((r) =>
        r.id === id ? { ...r, ...editForm } : r
      )
    );
    setEditingId(null);
  };

  const handleEditCancel = () => {
    setEditingId(null);
  };

  // Filtered and paginated data
  const filteredRecords = records.filter(
    (r) =>
      r.user.toLowerCase().includes(search.toLowerCase()) ||
      r.book.toLowerCase().includes(search.toLowerCase()) ||
      r.type.toLowerCase().includes(search.toLowerCase()) ||
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
      <Header />
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
            <h2 className="text-2xl font-semibold mb-4">Borrow Records</h2>
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search by user, book, type, or status..."
              className="border p-2 rounded mb-4 w-full"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
            {/* Add Record Form */}
            <form onSubmit={handleAdd} className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
              <input
                type="text"
                placeholder="User"
                className="border p-2 rounded"
                value={form.user}
                onChange={(e) => setForm({ ...form, user: e.target.value })}
              />
              <input
                type="text"
                placeholder="Book"
                className="border p-2 rounded"
                value={form.book}
                onChange={(e) => setForm({ ...form, book: e.target.value })}
              />
              <input
                type="text"
                placeholder="Type"
                className="border p-2 rounded"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              />
              <input
                type="date"
                className="border p-2 rounded"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add Record
              </button>
            </form>
            <table className="w-full table-auto border-collapse border border-gray-300 bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">User</th>
                  <th className="border px-4 py-2">Book</th>
                  <th className="border px-4 py-2">Type</th>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRecords.map((r) => (
                  <tr key={r.id}>
                    <td className="border px-4 py-2">{r.id}</td>
                    <td className="border px-4 py-2">
                      {editingId === r.id ? (
                        <input
                          value={editForm.user}
                          onChange={(e) => setEditForm({ ...editForm, user: e.target.value })}
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        r.user
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {editingId === r.id ? (
                        <input
                          value={editForm.book}
                          onChange={(e) => setEditForm({ ...editForm, book: e.target.value })}
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        r.book
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {editingId === r.id ? (
                        <input
                          value={editForm.type}
                          onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        r.type
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {editingId === r.id ? (
                        <input
                          type="date"
                          value={editForm.date}
                          onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        r.date
                      )}
                    </td>
                    <td className="border px-4 py-2">{r.status}</td>
                    <td className="border px-4 py-2 space-x-2">
                      {editingId === r.id ? (
                        <>
                          <button
                            onClick={() => handleEditSave(r.id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleEditCancel}
                            className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleView(r)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEditClick(r)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(r.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {Array.from({ length: emptyRows }).map((_, idx) => (
                  <tr key={`empty-${idx}`}>
                    <td className="border px-4 py-2">&nbsp;</td>
                    <td className="border px-4 py-2"></td>
                    <td className="border px-4 py-2"></td>
                    <td className="border px-4 py-2"></td>
                    <td className="border px-4 py-2"></td>
                    <td className="border px-4 py-2"></td>
                    <td className="border px-4 py-2"></td>
                  </tr>
                ))}
              </tbody>
            </table>
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
