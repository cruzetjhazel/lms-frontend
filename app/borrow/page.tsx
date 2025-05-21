'use client';

import { useState } from 'react';

export default function BorrowReturnPage() {
  const [form, setForm] = useState({
    user: '',
    bookTitle: '',
    type: 'Borrow', // Borrow or Return
    date: '',
    status: 'Pending',
  });

  const [records, setRecords] = useState([
    {
      id: 1,
      user: 'Mae',
      bookTitle: 'The Great Gatsby',
      type: 'Borrow',
      date: '2025-05-20',
      status: 'Approved',
    },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    user: '',
    bookTitle: '',
    type: 'Borrow',
    date: '',
    status: 'Pending',
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.user || !form.bookTitle || !form.date) return;

    const newRecord = { ...form, id: Date.now() };
    setRecords([newRecord, ...records]);
    setForm({ user: '', bookTitle: '', type: 'Borrow', date: '', status: 'Pending' });
  };

  const handleDelete = (id: number) => {
    setRecords(records.filter((r) => r.id !== id));
  };

  const handleView = (record: any) => {
    alert(
      `User: ${record.user}\nBook Title: ${record.bookTitle}\nType: ${record.type}\nDate: ${record.date}\nStatus: ${record.status}`
    );
  };

  const handleEditClick = (record: any) => {
    setEditingId(record.id);
    setEditForm({
      user: record.user,
      bookTitle: record.bookTitle,
      type: record.type,
      date: record.date,
      status: record.status,
    });
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Borrow / Return Records</h2>

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
          placeholder="Book Title"
          className="border p-2 rounded"
          value={form.bookTitle}
          onChange={(e) => setForm({ ...form, bookTitle: e.target.value })}
        />
        <select
          className="border p-2 rounded"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="Borrow">Borrow</option>
          <option value="Return">Return</option>
        </select>
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

      {/* Records Table */}
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">User</th>
            <th className="border px-4 py-2">Book Title</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td className="border px-4 py-2">{record.id}</td>
              <td className="border px-4 py-2">
                {editingId === record.id ? (
                  <input
                    value={editForm.user}
                    onChange={(e) => setEditForm({ ...editForm, user: e.target.value })}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  record.user
                )}
              </td>
              <td className="border px-4 py-2">
                {editingId === record.id ? (
                  <input
                    value={editForm.bookTitle}
                    onChange={(e) => setEditForm({ ...editForm, bookTitle: e.target.value })}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  record.bookTitle
                )}
              </td>
              <td className="border px-4 py-2">
                {editingId === record.id ? (
                  <select
                    value={editForm.type}
                    onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                    className="border p-1 rounded w-full"
                  >
                    <option value="Borrow">Borrow</option>
                    <option value="Return">Return</option>
                  </select>
                ) : (
                  record.type
                )}
              </td>
              <td className="border px-4 py-2">
                {editingId === record.id ? (
                  <input
                    type="date"
                    value={editForm.date}
                    onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  record.date
                )}
              </td>
              <td className="border px-4 py-2">{record.status}</td>
              <td className="border px-4 py-2 space-x-2">
                {editingId === record.id ? (
                  <>
                    <button
                      onClick={() => handleEditSave(record.id)}
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
                      onClick={() => handleView(record)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEditClick(record)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(record.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {records.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center p-4 text-gray-500">
                No records added.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
