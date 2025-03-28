// src/utils/auth.jsx
// This file contains the functions to interact with the local storage.

export const setToken = (token) => {
  const authData = {
    token,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // Token will expire in 24 hours
  };
  localStorage.setItem("authData", JSON.stringify(authData));
};

export const getToken = () => {
  const authDataString = localStorage.getItem("authData");
  if (!authDataString) return null;

  const authData = JSON.parse(authDataString);
  if (Date.now() > authData.expiresAt) {
    removeToken();
    return null;
  }

  return authData.token;
};

export const removeToken = () => {
  localStorage.removeItem("authData");
  // When we remove the token, mark that we've done a logout
  sessionStorage.setItem("loggedOut", "true");
};

export const isAuthenticated = () => {
  // Check if we've explicitly logged out in this session
  if (sessionStorage.getItem("loggedOut") === "true") {
    return false;
  }
  return !!getToken();
};

export const logout = () => {
  removeToken();
  // Use replace instead of href to prevent back button navigation
  window.location.replace("/");
};

// Add a history state to indicate authentication
export const setAuthHistory = () => {
  // This adds a state object that we can check when history navigation occurs
  window.history.replaceState({ authenticated: true }, "");
};

// Clear auth history state
export const clearAuthHistory = () => {
  window.history.replaceState({ authenticated: false }, "");
};
