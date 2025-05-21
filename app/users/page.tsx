'use client';

import { useState } from 'react';
import Header from '../../components/Header';

export default function UsersPage() {
  const [form, setForm] = useState({ name: '', email: '', role: '' });
  const [users, setUsers] = useState([
    { id: 1, name: 'Anna', email: 'anna@example.com', role: 'Admin' },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.role) return;

    const newUser = { ...form, id: Date.now() };
    setUsers([newUser, ...users]);
    setForm({ name: '', email: '', role: '' });
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleView = (user: any) => {
    alert(`Name: ${user.name}\nEmail: ${user.email}\nRole: ${user.role}`);
  };

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

  return (
    <div className="p-6">
      <Header />
      <h2 className="text-2xl font-semibold mb-4">Users</h2>

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

      {/* Users Table */}
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">
                {editingId === user.id ? (
                  <input
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="border px-4 py-2">
                {editingId === user.id ? (
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="border px-4 py-2">
                {editingId === user.id ? (
                  <input
                    value={editForm.role}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  user.role
                )}
              </td>
              <td className="border px-4 py-2 space-x-2">
                {editingId === user.id ? (
                  <>
                    <button
                      onClick={() => handleEditSave(user.id)}
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
                      onClick={() => handleView(user)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEditClick(user)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
