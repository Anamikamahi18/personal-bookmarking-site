import React, { useState, useEffect } from 'react';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './components/Auth/Login';  // Fixed: removed '../' 
import Signup from './components/Auth/Signup';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    document.title = `Personal Bookmarks - ${currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}`;
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onPageChange={handlePageChange} />;
      case 'login':
        return <Login onPageChange={handlePageChange} />;
      case 'signup':
        return <Signup onPageChange={handlePageChange} />;
      case 'dashboard':
        return <Dashboard />;
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