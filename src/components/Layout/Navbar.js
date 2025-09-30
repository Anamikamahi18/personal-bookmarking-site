import React, { useState } from 'react';
import { getCurrentUser, clearCurrentUser } from '../../utils/storage';
import ConfirmModal from '../Layout/ConfirmModal';

const Navbar = ({ onPageChange, currentPage }) => {
  const currentUser = getCurrentUser();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    clearCurrentUser();
    onPageChange('home');
    setShowLogoutModal(false);
  };

  return (
    <>
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Personal Bookmarks</h1>
          <div className="space-x-4">
            <button 
              onClick={() => onPageChange('home')}
              className={`px-3 py-2 rounded ${currentPage === 'home' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
            >
              Home
            </button>
            {currentUser ? (
              <>
                <button 
                  onClick={() => onPageChange('dashboard')}
                  className={`px-3 py-2 rounded ${currentPage === 'dashboard' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
                >
                  Dashboard
                </button>
                <span className="px-3 py-2">Welcome, {currentUser.username}</span>
                <button 
                  onClick={() => setShowLogoutModal(true)}
                  className="px-3 py-2 bg-red-500 hover:bg-red-600 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => onPageChange('login')}
                  className={`px-3 py-2 rounded ${currentPage === 'login' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
                >
                  Login
                </button>
                <button 
                  onClick={() => onPageChange('signup')}
                  className={`px-3 py-2 rounded ${currentPage === 'signup' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
                >
                  Signup
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
      <ConfirmModal
        open={showLogoutModal}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </>
  );
};

export default Navbar;