// src/components/UserList.jsx
// This component displays a list of users and allows the user to edit or delete them.

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button.jsx";
import { AppContext, useUserContext } from "../context/UserContext.jsx";
import ConfirmSelect from "./ui/ConfirmSelect.jsx";
import SortMenu from "./ui/SortMenu.jsx";

const UserList = () => {
  const {
    users,
    currentPage,
    totalPages,
    loading,
    setPage,
    deleteUserById,
    searchTerm,
    sortOption,
    setSortOption,
  } = useUserContext();
  const navigate = useNavigate();
  const [userToDelete, setUserToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Handle edit button click
  const handleEdit = (user) => {
    navigate(`/edit/${user.id}`, { state: { user } });
  };

  // Handle delete button click
  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setShowDeleteConfirm(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (userToDelete) {
      deleteUserById(userToDelete);
      setShowDeleteConfirm(false);
      setUserToDelete(null);
    }
  };

  return (
    <div className="w-full mx-auto px-4 py-2 pb-4">
      {/* Sorting Options */}
      <div className="mb-2 relative">
        <div className="flex justify-between items-center">
          <h2 className="text-white text-sm md:text-xl font-semibold">
            {searchTerm ? `Search Results: "${searchTerm}"` : "All Users"}
          </h2>
          <SortMenu sortOption={sortOption} setSortOption={setSortOption} />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-white text-xl">Loading users...</div>
        </div>
      ) : // Display users list
      users.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white border-3 border-transparent hover:border-white p-4 rounded-lg shadow-lg duration-300 hover:shadow-2xl"
              style={{
                background: "rgba(255, 255, 255, 0.4)",
                backdropFilter: "blur(20px)",
              }}
            >
              <img
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
                className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-gray-300"
              />
              <h3 className="text-center text-xl font-semibold text-black">{`${user.first_name} ${user.last_name}`}</h3>
              <p className="text-center text-gray-800">{user.email}</p>
              <div className="flex justify-center space-x-6 mt-6">
                <Button
                  onClick={() => handleEdit(user)}
                  variant="primary"
                  size="medium"
                  className="px-4 py-2"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteClick(user.id)}
                  variant="danger"
                  size="medium"
                  className="px-4 py-2"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-64">
          <img
            className="w-48 h-auto object-contain mix-blend-multiply"
            src="https://static.thenounproject.com/png/4147389-200.png"
            alt=""
          />
          <div className="text-white text-xl">No users found</div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-3">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <Button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                variant={currentPage === pageNum ? "solid" : "primary"}
                size="small"
                className={`px-3 py-1 rounded ${
                  currentPage === pageNum
                    ? "text-black bg-white"
                    : "bg-transparent text-white hover:bg-white"
                }`}
              >
                {pageNum}
              </Button>
            )
          )}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmSelect
        isOpen={showDeleteConfirm}
        message="Are you sure you want to delete this user? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
};

export default UserList;
