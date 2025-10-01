// User management
export const getUsers = () => {
  return JSON.parse(localStorage.getItem('users') || '[]');
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

// Current user management
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser') || 'null');
};

export const setCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const clearCurrentUser = () => {
  localStorage.removeItem('currentUser');
};

// Bookmark management
export const getBookmarks = (username) => {
  return JSON.parse(localStorage.getItem(`bookmarks_${username}`) || '[]');
};

export const addBookmark = (username, bookmark) => {
  const bookmarks = getBookmarks(username);
  
  if (bookmarks.length >= 5) {
    throw new Error('Maximum 5 bookmarks allowed');
  }
  
  const newBookmark = {
    ...bookmark,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  
  bookmarks.push(newBookmark);
  localStorage.setItem(`bookmarks_${username}`, JSON.stringify(bookmarks));
  return newBookmark;
};

export const updateBookmark = (username, updatedBookmark) => {
  const bookmarks = getBookmarks(username);
  const index = bookmarks.findIndex(bookmark => bookmark.id === updatedBookmark.id);
  
  if (index !== -1) {
    bookmarks[index] = updatedBookmark;
    localStorage.setItem(`bookmarks_${username}`, JSON.stringify(bookmarks));
  }
};

export const deleteBookmark = (username, bookmarkId) => {
  const bookmarks = getBookmarks(username);
  const filteredBookmarks = bookmarks.filter(bookmark => bookmark.id !== bookmarkId);
  localStorage.setItem(`bookmarks_${username}`, JSON.stringify(filteredBookmarks));
};