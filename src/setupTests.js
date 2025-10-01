import '@testing-library/jest-dom';

// Mock window.confirm for tests
global.confirm = jest.fn(() => true);

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Add debug helper for tests
global.debug = (element) => {
  console.log(element.innerHTML);
};