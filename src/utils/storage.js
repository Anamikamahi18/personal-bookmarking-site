// User management
export const getUsers = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

export const saveUser = (user) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
};

export const findUser = (email, password) => {
  const users = getUsers();
  return users.find(user => user.email === email && user.password === password);
};

export const userExists = (email) => {
  const users = getUsers();
  return users.some(user => user.email === email);
};

// Session management
export const getCurrentUser = () => {
  const currentUser = localStorage.getItem('currentUser');
  return currentUser ? JSON.parse(currentUser) : null;
};

export const setCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const clearCurrentUser = () => {
  localStorage.removeItem('currentUser');
};

// Bookmark management
export const getBookmarks = (username) => {
  const bookmarks = localStorage.getItem(`bookmarks_${username}`);
  return bookmarks ? JSON.parse(bookmarks) : [];
};

export const saveBookmarks = (username, bookmarks) => {
  localStorage.setItem(`bookmarks_${username}`, JSON.stringify(bookmarks));
};

export const addBookmark = (username, bookmark) => {
  const bookmarks = getBookmarks(username);
  if (bookmarks.length >= 5) {
    throw new Error('Maximum 5 bookmarks allowed');
  }
  const newBookmark = {
    id: Date.now().toString(),
    ...bookmark,
    createdAt: new Date().toISOString()
  };
  bookmarks.push(newBookmark);
  saveBookmarks(username, bookmarks);
  return newBookmark;
};

export const updateBookmark = (username, bookmarkId, updatedData) => {
  const bookmarks = getBookmarks(username);
  const index = bookmarks.findIndex(b => b.id === bookmarkId);
  if (index !== -1) {
    bookmarks[index] = { ...bookmarks[index], ...updatedData };
    saveBookmarks(username, bookmarks);
    return bookmarks[index];
  }
  return null;
};

export const deleteBookmark = (username, bookmarkId) => {
  const bookmarks = getBookmarks(username);
  const filteredBookmarks = bookmarks.filter(b => b.id !== bookmarkId);
  saveBookmarks(username, filteredBookmarks);
  return filteredBookmarks;
};