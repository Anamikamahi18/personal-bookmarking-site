import React from 'react';
import { getCurrentUser } from '../utils/storage';

const Home = ({ onPageChange }) => {
  const currentUser = getCurrentUser();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Welcome to Personal Bookmarks
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Save and organize your favorite websites in one place
          </p>

          {currentUser ? (
            <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
              <h2 className="text-2xl font-semibold mb-4">
                Welcome back, {currentUser.username}!
              </h2>
              <button
                onClick={() => onPageChange('dashboard')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Go to Dashboard
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
              <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
              <p className="text-gray-600 mb-6">
                Create an account to start saving your bookmarks
              </p>
              <div className="space-x-4">
                <button
                  onClick={() => onPageChange('signup')}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => onPageChange('login')}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Login
                </button>
              </div>
            </div>
          )}

          <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">Easy Storage</h3>
              <p className="text-gray-600">
                Save up to 5 bookmarks with titles and URLs for quick access
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">Search & Filter</h3>
              <p className="text-gray-600">
                Find your bookmarks quickly with our search functionality
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">Manage</h3>
              <p className="text-gray-600">
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