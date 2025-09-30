import React, { useState } from 'react';
import { addBookmark, getCurrentUser } from '../../utils/storage';
import SuccessMessage from '../Layout/SuccessMessage';


const AddBookmark = ({ onBookmarkAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    url: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

    try {
      const newBookmark = addBookmark(currentUser.username, formData);
      setSuccess('Bookmark added successfully!');
      setFormData({ title: '', url: '' });
      if (onBookmarkAdded) {
        onBookmarkAdded(newBookmark);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Add New Bookmark</h2>
      
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

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Bookmark
        </button>
      </form>
    </div>
  );
};

export default AddBookmark;