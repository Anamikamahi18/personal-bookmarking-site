import React, { useState, useEffect } from 'react';
import { getCurrentUser } from './utils/storage';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const currentUser = getCurrentUser();
    
    // If user is logged in and on auth pages, redirect to dashboard
    if (currentUser && (currentPage === 'login' || currentPage === 'signup')) {
      setCurrentPage('dashboard');
    }
    
    // If user is not logged in and trying to access dashboard, redirect to home
    if (!currentUser && currentPage === 'dashboard') {
      setCurrentPage('home');
    }
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onPageChange={handlePageChange} />;
      case 'dashboard':
        return <Dashboard />;
      case 'login':
        return <Login onPageChange={handlePageChange} />;
      case 'signup':
        return <Signup onPageChange={handlePageChange} />;
      default:
        return <Home onPageChange={handlePageChange} />;
    }
  };

  return (
    <div className="App">
      <Navbar onPageChange={handlePageChange} currentPage={currentPage} />
      {renderPage()}
    </div>
  );
}

export default App;