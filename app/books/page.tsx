'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

export default function BooksPage() {
  const [form, setForm] = useState({ title: '', author: '', category: '', status: 'Available' });
  const [books, setBooks] = useState([
    { id: 1, title: 'Introduction to React', author: 'Dan Abramov', category: 'Programming', status: 'Available' },
  ]);
  const [lastId, setLastId] = useState(1);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ title: '', author: '', category: '' });
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  // Add Book
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.category) return;
    const newId = lastId + 1;
    const newBook = { ...form, id: newId };
    setBooks([...books, newBook]);
    setForm({ title: '', author: '', category: '', status: 'Available' });
    setCurrentPage(1);
    setLastId(newId);
  };

  // Delete Book
  const handleDelete = (id: number) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  // View Book
  const handleView = (book: any) => {
    alert(`Title: ${book.title}\nAuthor: ${book.author}\nCategory: ${book.category}\nStatus: ${book.status}`);
  };

  // Edit Book
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

  // Filtered and paginated data
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.category.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / rowsPerPage));
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const emptyRows = rowsPerPage - paginatedBooks.length;

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
              >
                Add Book
              </button>
            </form>
            <table className="w-full table-auto border-collapse border border-gray-300 bg-white">
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
                {paginatedBooks.map((book) => (
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
