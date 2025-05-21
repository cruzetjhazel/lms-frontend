import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-10">📚 Library</h2>
        <nav className="space-y-4">
          <Link href="/dashboard">
            <span className="block px-4 py-2 rounded hover:bg-blue-700">Home</span>
          </Link>
          <Link href="/users">
            <span className="block px-4 py-2 rounded hover:bg-blue-700">Users</span>
          </Link>
          <Link href="/books">
            <span className="block px-4 py-2 rounded hover:bg-blue-700">Books</span>
          </Link>
          <Link href="/borrow">
            <span className="block px-4 py-2 rounded hover:bg-blue-700">Borrow</span>
          </Link>
          <Link href="/logout">
            <span className="block px-4 py-2 rounded hover:bg-blue-700 text-red-300">Logout</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6"></h1>

          {/* Table Section */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-100 text-left">
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
                {/* Sample Record */}
                <tr>
                  <td className="border px-4 py-2">1</td>
                  <td className="border px-4 py-2">Mae</td>
                  <td className="border px-4 py-2">The Great Gatsby</td>
                  <td className="border px-4 py-2">Borrow</td>
                  <td className="border px-4 py-2">2025-05-20</td>
                  <td className="border px-4 py-2 text-green-600">Approved</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs">View</button>
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs">Edit</button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">Delete</button>
                  </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>

          {/* Add New Record Button */}
          <div className="mt-6 text-right">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
              + Add Record
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
