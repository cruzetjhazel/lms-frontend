'use client';

import { useState } from 'react';

export default function BooksPage() {
  const [form, setForm] = useState({ title: '', author: '', category: '', status: 'Available' });
  const [books, setBooks] = useState([
    { id: 1, title: 'Introduction to React', author: 'Dan Abramov', category: 'Programming', status: 'Available' },
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ title: '', author: '', category: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.category) return;

    const newBook = { ...form, id: Date.now() };
    setBooks([newBook, ...books]);
    setForm({ title: '', author: '', category: '', status: 'Available' });
  };

  const handleDelete = (id: number) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const handleView = (book: any) => {
    alert(`Title: ${book.title}\nAuthor: ${book.author}\nCategory: ${book.category}\nStatus: ${book.status}`);
  };

  const handleEditClick = (book: any) => {
    setEditingId(book.id);
    setEditForm({ title: book.title, author: book.author, category: book.category });
  };

  const handleEditSave = (id: number) => {
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, ...editForm } : book
      )
    );
    setEditingId(null);
  };

  const handleEditCancel = () => {
    setEditingId(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Book List</h2>

      {/* Add Book Form */}
      <form onSubmit={handleAdd} className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          className="border p-2 rounded"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          className="border p-2 rounded"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Book
        </button>
      </form>

      {/* Book Table */}
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Author</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td className="border px-4 py-2">{book.id}</td>
              <td className="border px-4 py-2">
                {editingId === book.id ? (
                  <input
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  book.title
                )}
              </td>
              <td className="border px-4 py-2">
                {editingId === book.id ? (
                  <input
                    value={editForm.author}
                    onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  book.author
                )}
              </td>
              <td className="border px-4 py-2">
                {editingId === book.id ? (
                  <input
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  book.category
                )}
              </td>
              <td className="border px-4 py-2 text-green-600">{book.status}</td>
              <td className="border px-4 py-2 space-x-2">
                {editingId === book.id ? (
                  <>
                    <button
                      onClick={() => handleEditSave(book.id)}
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
                      onClick={() => handleView(book)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEditClick(book)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {books.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center p-4 text-gray-500">
                No books added.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
