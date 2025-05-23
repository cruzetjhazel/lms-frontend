import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile - Library Management System',
  description: 'User profile page',
};

function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Profile</h2>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <div className="mt-1 text-gray-900">Admin User</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="mt-1 text-gray-900">admin@library.com</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <div className="mt-1 text-gray-900">Administrator</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage; 