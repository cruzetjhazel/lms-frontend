import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside
      className="w-80 text-white flex flex-col items-center p-6 pt-32"
      style={{ backgroundColor: '#331C05' }}
    >
      <h2 className="text-2xl font-bold mb-10 mt-4 text-center">📚 Home</h2>
      <nav className="flex flex-col space-y-4 w-full">
        <Link
          href="/dashboard"
          className="block px-4 py-2 rounded hover:bg-opacity-80 hover:bg-black/20 text-center"
        >
          Home
        </Link>
        <Link
          href="/users"
          className="block px-4 py-2 rounded hover:bg-opacity-80 hover:bg-black/20 text-center"
        >
          Users
        </Link>
        <Link
          href="/books"
          className="block px-4 py-2 rounded hover:bg-opacity-80 hover:bg-black/20 text-center"
        >
          Books
        </Link>
        <Link
          href="/borrow"
          className="block px-4 py-2 rounded hover:bg-opacity-80 hover:bg-black/20 text-center"
        >
          Borrow
        </Link>
        <Link
          href="/logout"
          className="block px-4 py-2 rounded hover:bg-opacity-80 hover:bg-black/20 text-red-300 text-center"
        >
          Logout
        </Link>
      </nav>
    </aside>
  );
}