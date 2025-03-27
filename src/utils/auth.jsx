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
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const logout = () => {
  removeToken();
  window.location.href = "/";
};
