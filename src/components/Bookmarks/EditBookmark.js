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

    const currentUser = getCurrentUser();
    if (!currentUser) {
      setError('Please login first');
      return;
    }

    const updatedBookmark = updateBookmark(currentUser.username, bookmark.id, formData);
    if (updatedBookmark) {
      setSuccess('Bookmark updated successfully!');
      if (onBookmarkUpdated) {
        onBookmarkUpdated(updatedBookmark);
      }
      setTimeout(() => {
        onCancel();
      }, 1500);
    } else {
      setError('Failed to update bookmark');
    }
  };

  if (!bookmark) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h2 className="text-2xl font-bold mb-4">Edit Bookmark</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <SuccessMessage message={success} />

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter bookmark title"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              URL
            </label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="https://example.com"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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