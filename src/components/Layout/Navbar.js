import React, { useState } from 'react';
import { getCurrentUser, clearCurrentUser } from '../../utils/storage';
import ConfirmModal from './ConfirmModal';

const Navbar = ({ onPageChange, currentPage }) => {
  const currentUser = getCurrentUser();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    clearCurrentUser();
    onPageChange('home');
    setShowLogoutModal(false);
    setIsMenuOpen(false);
  };

  const handleNavClick = (page) => {
    onPageChange(page);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-lg md:text-xl font-bold">Personal Bookmarks</h1>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col w-6 h-6 justify-center items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
            <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-4">
            <button 
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded ${currentPage === 'home' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
            >
              Home
            </button>
            
            {currentUser ? (
              <>
                <button 
                  onClick={() => handleNavClick('dashboard')}
                  className={`px-3 py-2 rounded ${currentPage === 'dashboard' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
                >
                  Dashboard
                </button>
                <span className="px-3 py-2 text-sm">Welcome, {currentUser.username}</span>
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
                  onClick={() => handleNavClick('login')}
                  className={`px-3 py-2 rounded ${currentPage === 'login' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
                >
                  Login
                </button>
                <button 
                  onClick={() => handleNavClick('signup')}
                  className={`px-3 py-2 rounded ${currentPage === 'signup' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
                >
                  Signup
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-2">
              <button 
                onClick={() => handleNavClick('home')}
                className={`px-3 py-2 rounded text-left ${currentPage === 'home' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
              >
                Home
              </button>
              
              {currentUser ? (
                <>
                  <button 
                    onClick={() => handleNavClick('dashboard')}
                    className={`px-3 py-2 rounded text-left ${currentPage === 'dashboard' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
                  >
                    Dashboard
                  </button>
                  <span className="px-3 py-2 text-sm text-blue-200">
                    Welcome, {currentUser.username}
                  </span>
                  <button 
                    onClick={() => setShowLogoutModal(true)}
                    className="px-3 py-2 bg-red-500 hover:bg-red-600 rounded text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => handleNavClick('login')}
                    className={`px-3 py-2 rounded text-left ${currentPage === 'login' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => handleNavClick('signup')}
                    className={`px-3 py-2 rounded text-left ${currentPage === 'signup' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
                  >
                    Signup
                  </button>
                </>
              )}
            </div>
          </div>
        )}
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