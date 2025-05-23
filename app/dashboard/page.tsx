import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

export default function DashboardPage() {
  // Example stats (replace with real data from backend if needed)
  const stats = [
    { 
      label: 'Total Books', 
      value: 120, 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    { 
      label: 'Total Users', 
      value: 45, 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      label: 'Books Borrowed', 
      value: 32, 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    },
    { 
      label: 'Books Available', 
      value: 88, 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    { 
      label: 'Pending Requests', 
      value: 4, 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
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
          <div className="max-w-6xl mx-auto">
            {/* Title Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-900 to-[#834F3B] bg-clip-text text-transparent">
                Home
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-amber-900 to-[#834F3B] rounded-full mt-2"></div>
            </div>

            {/* Welcome Message */}
            <div className="bg-white bg-opacity-90 rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-[#834F3B] mb-2">Welcome Back!</h2>
              <p className="text-gray-600">
                Here's what's happening in your library today.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white bg-opacity-90 rounded-xl shadow-md p-6 flex flex-col items-center transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  <div className="text-[#834F3B] mb-3">{stat.icon}</div>
                  <div className="text-3xl font-bold text-[#834F3B] mb-2">{stat.value}</div>
                  <div className="text-gray-600 text-sm text-center">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* About Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white bg-opacity-90 rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-semibold text-[#834F3B] mb-4">About This System</h2>
                <p className="text-gray-600 mb-4">
                  This Library Management System helps you keep track of books, users, and borrowing activities. Use the sidebar to navigate between managing books, users, and borrow records.
                </p>
                <p className="text-gray-600">
                  Stay organized and efficient with real-time updates and easy-to-use features designed for your library's needs.
                </p>
              </div>
              <div className="bg-white bg-opacity-90 rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-semibold text-[#834F3B] mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-amber-50 text-[#834F3B] px-4 py-3 rounded-xl hover:bg-amber-100 transition-all duration-200 text-sm flex items-center justify-center gap-2 shadow-sm">
                    <span>Add Book</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                  <button className="bg-amber-50 text-[#834F3B] px-4 py-3 rounded-xl hover:bg-amber-100 transition-all duration-200 text-sm flex items-center justify-center gap-2 shadow-sm">
                    <span>Add User</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </button>
                  <button className="bg-amber-50 text-[#834F3B] px-4 py-3 rounded-xl hover:bg-amber-100 transition-all duration-200 text-sm flex items-center justify-center gap-2 shadow-sm">
                    <span>New Borrow</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </button>
                  <button className="bg-amber-50 text-[#834F3B] px-4 py-3 rounded-xl hover:bg-amber-100 transition-all duration-200 text-sm flex items-center justify-center gap-2 shadow-sm">
                    <span>Reports</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
