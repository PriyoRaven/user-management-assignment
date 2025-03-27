// src/components/UserList.jsx
// This component displays a list of users and allows the user to edit or delete them.

import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button.jsx";
import { AppContext, useUserContext } from "../context/UserContext.jsx";

const UserList = () => {
  const { users, currentPage, totalPages, loading, setPage, deleteUserById } =
    useUserContext();
  const navigate = useNavigate();

  // Handle edit button click
  const handleEdit = (user) => {
    navigate(`/edit/${user.id}`, { state: { user } });
  };

  // Handle delete button click
  const handleDelete = async (userId) => {
    deleteUserById(userId);
  };

  return (
    <div className="w-full mx-auto p-4 pb-8">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-white text-xl">Loading users...</div>
        </div>
      ) : (
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
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-300"
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
                  onClick={() => handleDelete(user.id)}
                  variant="danger"
                  size="medium"
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-3">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
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
        ))}
      </div>
    </div>
  );
};

export default UserList;
