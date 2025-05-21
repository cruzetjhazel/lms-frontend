'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

export default function UsersPage() {
  const [form, setForm] = useState({ name: '', email: '', role: '', status: 'Active' });
  const [users, setUsers] = useState([
    { id: 1, name: 'Mae', email: 'mae@email.com', role: 'Admin', status: 'Active' },
  ]);
  const [lastId, setLastId] = useState(1);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: '' });
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

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
  };

  // Delete User
  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // View User
  const handleView = (user: any) => {
    alert(`Name: ${user.name}\nEmail: ${user.email}\nRole: ${user.role}\nStatus: ${user.status}`);
  };

  // Edit User
  const handleEditClick = (user: any) => {
    setEditingId(user.id);
    setEditForm({ name: user.name, email: user.email, role: user.role });
  };

  const handleEditSave = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, ...editForm } : user
      )
    );
    setEditingId(null);
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
            <h2 className="text-2xl font-semibold mb-4">Users</h2>
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search by name, email, role, or status..."
              className="border p-2 rounded mb-4 w-full"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
            {/* Add User Form */}
            <form onSubmit={handleAdd} className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="border p-2 rounded"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                className="border p-2 rounded"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                type="text"
                placeholder="Role"
                className="border p-2 rounded"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add User
              </button>
            </form>
            <table className="w-full table-auto border-collapse border border-gray-300 bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Role</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((u) => (
                  <tr key={u.id}>
                    <td className="border px-4 py-2">{u.id}</td>
                    <td className="border px-4 py-2">
                      {editingId === u.id ? (
                        <input
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        u.name
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {editingId === u.id ? (
                        <input
                          value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        u.email
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {editingId === u.id ? (
                        <input
                          value={editForm.role}
                          onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        u.role
                      )}
                    </td>
                    <td className="border px-4 py-2">{u.status}</td>
                    <td className="border px-4 py-2 space-x-2">
                      {editingId === u.id ? (
                        <>
                          <button
                            onClick={() => handleEditSave(u.id)}
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
                            onClick={() => handleView(u)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEditClick(u)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(u.id)}
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
