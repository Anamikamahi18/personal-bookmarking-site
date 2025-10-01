import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock all storage functions
jest.mock('./utils/storage', () => ({
  getCurrentUser: jest.fn(() => null),
  clearCurrentUser: jest.fn(),
  findUser: jest.fn(),
  setCurrentUser: jest.fn(),
  saveUser: jest.fn(),
  userExists: jest.fn(),
  getBookmarks: jest.fn(() => []),
  addBookmark: jest.fn(),
  updateBookmark: jest.fn(),
  deleteBookmark: jest.fn()
}));

test('renders home and navigates to signup', () => {
  render(<App />);
  expect(screen.getByText(/welcome to personal bookmarks/i)).toBeInTheDocument();
  
  // Click signup button in navbar (use getAllByRole and pick the first one)
  const signupButtons = screen.getAllByRole('button', { name: /signup/i });
  fireEvent.click(signupButtons[0]);
  
  // Check for form heading instead of button text
  expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();
});

test('navigates to login', () => {
  render(<App />);
  
  // Click login button in navbar (use getAllByRole and pick the first one)
  const loginButtons = screen.getAllByRole('button', { name: /^login$/i });
  fireEvent.click(loginButtons[0]);
  
  // Check for form heading instead of button
  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
});