import React, { createContext, useState, useContext, useEffect } from "react";
import { fetchUsers as fetchUsersFromApi } from "../services/api";

export const AppContext = createContext();

// This context provider is a wrapper for the UserContext
// It provides the user data to all components in the app
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    users: [],
    totalPages: 0,
    currentPage: 1,
    loading: false,
  });
  const [initialized, setInitialized] = useState(false);

  // Load initial data from sessionStorage or API
  useEffect(() => {
    const storedData = sessionStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
      setInitialized(true);
    } else {
      loadInitialData();
    }
  }, []);

  // Save to sessionStorage whenever userData changes
  useEffect(() => {
    if (initialized) {
      sessionStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData, initialized]);

  const loadInitialData = async () => {
    setUserData((prev) => ({ ...prev, loading: true }));
    try {
      // Fetch all pages of users to have complete data
      const page1 = await fetchUsersFromApi(1);
      const totalPages = page1.total_pages;

      let allUsers = [...page1.data];

      // Fetch additional pages if needed
      for (let i = 2; i <= totalPages; i++) {
        const pageData = await fetchUsersFromApi(i);
        allUsers = [...allUsers, ...pageData.data];
      }

      setUserData({
        users: allUsers,
        totalPages,
        currentPage: 1,
        loading: false,
      });
      setInitialized(true);
    } catch (error) {
      console.error("Failed to load initial data", error);
      setUserData((prev) => ({ ...prev, loading: false }));
    }
  };

  const resetData = async () => {
    sessionStorage.removeItem("userData");
    setInitialized(false);
    await loadInitialData();
  };

  const updateUser = (id, updatedUserData) => {
    setUserData((prev) => {
      const updatedUsers = prev.users.map((user) =>
        user.id === id ? { ...user, ...updatedUserData } : user
      );
      return { ...prev, users: updatedUsers };
    });
  };

  const deleteUserById = (id) => {
    setUserData((prev) => {
      const filteredUsers = prev.users.filter((user) => user.id !== id);
      return { ...prev, users: filteredUsers };
    });
  };

  // Get users for the current page
  const getCurrentPageUsers = () => {
    const { users, currentPage } = userData;
    const perPage = 6; // Same as the API's per_page
    const startIndex = (currentPage - 1) * perPage;
    return users.slice(startIndex, startIndex + perPage);
  };

  const setPage = (page) => {
    setUserData((prev) => ({ ...prev, currentPage: page }));
  };

  return (
    <AppContext.Provider
      value={{
        users: getCurrentPageUsers(),
        totalPages: userData.totalPages,
        currentPage: userData.currentPage,
        loading: userData.loading,
        setPage,
        updateUser,
        deleteUserById,
        resetData,
        getUserById: (id) => userData.users.find((user) => user.id === id),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export const useUserContext = () => useContext(AppContext);

export default AppContext;
