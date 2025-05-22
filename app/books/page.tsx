'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import api from '../api/config';

export default function BooksPage() {
  const [form, setForm] = useState({ title: '', author: '', category: '', status: 'Available' });
  const [books, setBooks] = useState([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ title: '', author: '', category: '' });
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const rowsPerPage = 6;

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/books');
      setBooks(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  // Add Book
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.category) return;

    try {
      setLoading(true);
      const response = await api.post('/admin/books', form);
      setBooks([response.data, ...books]);
      setForm({ title: '', author: '', category: '', status: 'Available' });
      setCurrentPage(1);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add book');
    } finally {
      setLoading(false);
    }
  };

  // Delete Book
  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await api.delete(`/admin/books/${id}`);
      setBooks(books.filter((book: any) => book.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete book');
    } finally {
      setLoading(false);
    }
  };

  // View Book
  const handleView = async (id: number) => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/books/${id}`);
      const book = response.data;
      alert(`Title: ${book.title}\nAuthor: ${book.author}\nCategory: ${book.category}\nStatus: ${book.status}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch book details');
    } finally {
      setLoading(false);
    }
  };

  // Edit Book
  const handleEditClick = (book: any) => {
    setEditingId(book.id);
    setEditForm({ title: book.title, author: book.author, category: book.category });
  };

  const handleEditSave = async (id: number) => {
    try {
      setLoading(true);
      const response = await api.put(`/admin/books/${id}`, editForm);
      setBooks(books.map((book: any) => book.id === id ? response.data : book));
      setEditingId(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update book');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
  };

  // Filtered and paginated data
  const filteredBooks = books.filter((book: any) =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase()) ||
    book.category.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / rowsPerPage));
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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
            <h2 className="text-2xl font-semibold mb-4">Book List</h2>
            {error && (
              <div className="mb-4 p-2 text-red-600 bg-red-100 rounded">
                {error}
              </div>
            )}
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search by title, author, or category..."
              className="border p-2 rounded mb-4 w-full"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
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
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Book'}
              </button>
            </form>

            {/* Book Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedBooks.map((book: any) => (
                    <tr key={book.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingId === book.id ? (
                          <input
                            type="text"
                            value={editForm.title}
                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                            className="border p-1 rounded"
                          />
                        ) : (
                          book.title
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingId === book.id ? (
                          <input
                            type="text"
                            value={editForm.author}
                            onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
                            className="border p-1 rounded"
                          />
                        ) : (
                          book.author
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingId === book.id ? (
                          <input
                            type="text"
                            value={editForm.category}
                            onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                            className="border p-1 rounded"
                          />
                        ) : (
                          book.category
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{book.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingId === book.id ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditSave(book.id)}
                              className="text-green-600 hover:text-green-900"
                              disabled={loading}
                            >
                              Save
                            </button>
                            <button
                              onClick={handleEditCancel}
                              className="text-gray-600 hover:text-gray-900"
                              disabled={loading}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView(book.id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleEditClick(book)}
                              className="text-yellow-600 hover:text-yellow-900"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(book.id)}
                              className="text-red-600 hover:text-red-900"
                              disabled={loading}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
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
