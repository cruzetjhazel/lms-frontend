'use client';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { useState } from 'react';

type Book = {
  id: number;
  title: string;
  author: string;
  year: number;
  available: boolean;
};

const sampleBooks: Book[] = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, available: true },
  { id: 2, title: '1984', author: 'George Orwell', year: 1949, available: false },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960, available: true },
];

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>(sampleBooks);

  const handleBorrow = (id: number) => {
    // Here you would call your backend to borrow the book
    setBooks(books =>
      books.map(book =>
        book.id === id ? { ...book, available: false } : book
      )
    );
    alert('Book borrowed!');
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen" style={{
        backgroundImage: "url('/background2.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <Sidebar />
        <main className="flex-1 p-10">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Books</h1>
            <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="border px-4 py-2">Title</th>
                  <th className="border px-4 py-2">Author</th>
                  <th className="border px-4 py-2">Year</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {books.map(book => (
                  <tr key={book.id}>
                    <td className="border px-4 py-2">{book.title}</td>
                    <td className="border px-4 py-2">{book.author}</td>
                    <td className="border px-4 py-2">{book.year}</td>
                    <td className="border px-4 py-2">
                      {book.available ? (
                        <span className="text-green-600">Available</span>
                      ) : (
                        <span className="text-red-500">Borrowed</span>
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs disabled:opacity-50"
                        onClick={() => handleBorrow(book.id)}
                        disabled={!book.available}
                      >
                        Borrow
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}
