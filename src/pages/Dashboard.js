import React, { useState } from 'react';
import { getCurrentUser } from '../utils/storage';
import AddBookmark from '../components/Bookmarks/AddBookmark';
import BookmarkList from '../components/Bookmarks/BookmarkList';

const Dashboard = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const currentUser = getCurrentUser();

  const handleBookmarkAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
          <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800">
            Please login to access your dashboard
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Welcome back, {currentUser.username}! Manage your bookmarks here.
          </p>
        </div>

        <div className="grid gap-6 md:gap-8">
          <AddBookmark onBookmarkAdded={handleBookmarkAdded} />
          <BookmarkList refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;