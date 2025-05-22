import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

export default function DashboardPage() {
  // Example stats (replace with real data from backend if needed)
  const stats = [
    { label: 'Total Books', value: 120 },
    { label: 'Total Users', value: 45 },
    { label: 'Books Borrowed', value: 32 },
    { label: 'Books Available', value: 88 },
    { label: 'Pending Requests', value: 4 },
  ];

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
          <div className="max-w-4xl mx-auto bg-white bg-opacity-70 rounded-xl shadow-md p-10">
            <h1 className="text-5xl font-bold text-gray-800 mb-2 text-center">Overview</h1>
            <p className="text-lg text-gray-700 mb-8 text-center">
              Welcome to your Library Management System dashboard. Here you can get a quick overview of your library's activity and statistics.
            </p>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white bg-opacity-90 rounded-lg shadow p-6 flex flex-col items-center"
                >
                  <div className="text-3xl font-bold text-[#834F3B] mb-2">{stat.value}</div>
                  <div className="text-gray-700 text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
            {/* About Section */}
            <div className="bg-white bg-opacity-80 rounded-lg p-6 shadow text-center">
              <h2 className="text-2xl font-semibold mb-2 text-[#834F3B]">About This System</h2>
              <p className="text-gray-700 mb-2">
                This Library Management System helps you keep track of books, users, and borrowing activities. Use the sidebar to navigate between managing books, users, and borrow records.
              </p>
              <p className="text-gray-700">
                Stay organized and efficient with real-time updates and easy-to-use features designed for your library's needs.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
