import React from 'react';

const ConfirmModal = ({ open, title, message, confirmText = "Confirm", cancelText = "Cancel", onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm mx-4">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="mb-4 text-gray-700 text-sm md:text-base">{message}</p>
        <div className="flex flex-col sm:flex-row gap-2 sm:justify-end sm:space-x-2">
          <button
            onClick={onCancel}
            className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 order-2 sm:order-1"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 order-1 sm:order-2"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;