import React from 'react';
import { getCurrentUser } from '../utils/storage';

const Home = ({ onPageChange }) => {
  const currentUser = getCurrentUser();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Welcome to Personal Bookmarks
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 px-4">
            Save and organize your favorite websites in one place
          </p>

          {currentUser ? (
            <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
              <h2 className="text-xl md:text-2xl font-semibold mb-4">
                Welcome back, {currentUser.username}!
              </h2>
              <button
                onClick={() => onPageChange('dashboard')}
                className="w-full md:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Go to Dashboard
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
              <h2 className="text-xl md:text-2xl font-semibold mb-4">Get Started</h2>
              <p className="text-gray-600 mb-6">
                Create an account to start saving your bookmarks
              </p>
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={() => onPageChange('signup')}
                  className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-3">Easy Storage</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Save up to 5 bookmarks with titles and URLs for quick access
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-3">Search & Filter</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Find your bookmarks quickly with our search functionality
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-3">Manage</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Edit or delete bookmarks as needed to keep your collection organized
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;