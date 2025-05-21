import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside
      className="w-64 text-white flex flex-col p-6"
      style={{ backgroundColor: '#331C05' }}
    >
      <h2 className="text-2xl font-bold mb-10">📚 Home</h2>
      <nav className="flex flex-col space-y-4">
        <Link
          href="/dashboard"
          className="block px-4 py-2 rounded hover:bg-opacity-80 hover:bg-black/20"
        >
          Home
        </Link>
        <Link
          href="/users"
          className="block px-4 py-2 rounded hover:bg-opacity-80 hover:bg-black/20"
        >
          Users
        </Link>
        <Link
          href="/books"
          className="block px-4 py-2 rounded hover:bg-opacity-80 hover:bg-black/20"
        >
          Books
        </Link>
        <Link
          href="/borrow"
          className="block px-4 py-2 rounded hover:bg-opacity-80 hover:bg-black/20"
        >
          Borrow
        </Link>
        <Link
          href="/logout"
          className="block px-4 py-2 rounded hover:bg-opacity-80 hover:bg-black/20 text-red-300"
        >
          Logout
        </Link>
      </nav>
    </aside>
  );
}