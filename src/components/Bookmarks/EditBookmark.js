import React, { useState, useEffect } from 'react';
import { updateBookmark, getCurrentUser } from '../../utils/storage';
import SuccessMessage from '../Layout/SuccessMessage';

const EditBookmark = ({ bookmark, onBookmarkUpdated, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    url: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (bookmark) {
      setFormData({
        title: bookmark.title,
        url: bookmark.url
      });
    }
  }, [bookmark]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.title || !formData.url) {
      setError('All fields are required');
      return;
    }

    const currentUser = getCurrentUser();
    if (!currentUser) {
      setError('User not logged in');
      return;
    }

    const updatedBookmark = {
      ...bookmark,
      title: formData.title,
      url: formData.url
    };

    updateBookmark(currentUser.username, updatedBookmark);
    setSuccess('Bookmark updated successfully!');
    
    setTimeout(() => {
      onBookmarkUpdated();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Edit Bookmark</h3>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <SuccessMessage message={success} />

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="edit-title" className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              id="edit-title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="edit-url" className="block text-gray-700 text-sm font-bold mb-2">
              URL
            </label>
            <input
              id="edit-url"
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
            >
              Update Bookmark
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookmark;