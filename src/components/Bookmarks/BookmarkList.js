import React, { useState, useEffect, useCallback } from 'react';
import { getBookmarks, deleteBookmark, getCurrentUser } from '../../utils/storage';
import EditBookmark from './EditBookmark';
import ConfirmModal from '../Layout/ConfirmModal';

const BookmarkList = ({ refreshTrigger }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookmarkToDelete, setBookmarkToDelete] = useState(null);
  const bookmarksPerPage = 3;

  const currentUser = getCurrentUser();

  const loadBookmarks = useCallback(() => {
    if (currentUser) {
      const userBookmarks = getBookmarks(currentUser.username);
      // Changed: Sort by oldest first (first added appears first)
      const sortedBookmarks = userBookmarks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setBookmarks(sortedBookmarks);
    }
  }, [currentUser]);

  const filterBookmarks = useCallback(() => {
    let filtered = bookmarks;
    if (searchQuery) {
      filtered = bookmarks.filter(bookmark =>
        bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bookmark.url.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredBookmarks(filtered);
  }, [bookmarks, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    loadBookmarks();
  }, [loadBookmarks, refreshTrigger]);

  useEffect(() => {
    filterBookmarks();
  }, [filterBookmarks]);

  const handleDeleteClick = (bookmark) => {
    setBookmarkToDelete(bookmark);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (bookmarkToDelete) {
      deleteBookmark(currentUser.username, bookmarkToDelete.id);
      loadBookmarks();
      setShowDeleteModal(false);
      setBookmarkToDelete(null);
    }
  };

  const handleEdit = (bookmark) => {
    setEditingBookmark(bookmark);
  };

  const handleBookmarkUpdated = () => {
    loadBookmarks();
    setEditingBookmark(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalPages = Math.max(1, Math.ceil(filteredBookmarks.length / bookmarksPerPage));
  const indexOfLastBookmark = currentPage * bookmarksPerPage;
  const indexOfFirstBookmark = indexOfLastBookmark - bookmarksPerPage;
  const currentBookmarks = filteredBookmarks.slice(indexOfFirstBookmark, indexOfLastBookmark);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  if (!currentUser) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500">Please login to view your bookmarks.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h2 className="text-xl md:text-2xl font-bold">My Bookmarks ({filteredBookmarks.length})</h2>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search bookmarks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <svg
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {filteredBookmarks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">
            {searchQuery ? 'No bookmarks found matching your search.' : 'No bookmarks yet. Add your first bookmark!'}
          </p>
        </div>
      ) : (
        <>
          {/* Bookmarks List */}
          <div className="space-y-4">
            {currentBookmarks.map((bookmark) => (
              <div key={bookmark.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 break-words">
                      {bookmark.title}
                    </h3>
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 break-all text-sm md:text-base"
                    >
                      {bookmark.url}
                    </a>
                    <p className="text-xs md:text-sm text-gray-500 mt-2">
                      Added: {formatDate(bookmark.createdAt)}
                    </p>
                  </div>
                  
                  <div className="flex flex-row md:flex-col lg:flex-row gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleEdit(bookmark)}
                      className="flex-1 md:flex-none bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(bookmark)}
                      className="flex-1 md:flex-none bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <nav className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-2 md:px-3 py-2 rounded text-sm ${
                    currentPage === 1
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  Previous
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className={`px-2 md:px-3 py-2 rounded text-sm ${
                      currentPage === index + 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-2 md:px-3 py-2 rounded text-sm ${
                    currentPage === totalPages
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      )}

      {/* Edit Modal */}
      {editingBookmark && (
        <EditBookmark
          bookmark={editingBookmark}
          onBookmarkUpdated={handleBookmarkUpdated}
          onCancel={() => setEditingBookmark(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        open={showDeleteModal}
        title="Delete Bookmark"
        message="Are you sure you want to delete this bookmark?"
        confirmText="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
};

export default BookmarkList;