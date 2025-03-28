// src/components/EditUser.jsx
// This component allows the user to edit a user's information.

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "./ui/Button.jsx";
import { useUserContext } from "../context/UserContext";
import ConfirmSelect from "./ui/ConfirmSelect.jsx";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getUserById, updateUser } = useUserContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const user = getUserById(parseInt(id));

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveConfirm = async () => {
    setIsLoading(true);
    setError("");

    try {
      updateUser(parseInt(id), formData);
      navigate("/users");
    } catch (error) {
      setError("Failed to update user. Please try again.");
      console.error("Error updating user:", error);
    } finally {
      setIsLoading(false);
      setShowSaveConfirm(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSaveConfirm(true);
  };

  const handleCancelConfirm = () => {
    navigate("/users");
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowCancelConfirm(true);
  };

  if (!user) {
    return <div className="text-center p-8 text-white">User not found</div>;
  }

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div
        className="bg-white rounded-lg shadow-lg p-6"
        style={{
          background: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Edit User</h2>

        <div className="flex justify-center mb-6">
          <img
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            className="w-32 h-32 rounded-full border-4 border-gray-300"
          />
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black mb-2">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full p-2 border rounded outline-hidden focus:border-b-4"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-black mb-2">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full p-2 border rounded outline-hidden focus:border-b-4"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-black mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded outline-hidden focus:border-b-4"
              required
            />
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              onClick={handleCancelClick}
              variant="secondary"
              size="medium"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="medium"
              loading={isLoading}
              loadingText="Saving..."
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>

      {/* Save Confirmation Dialog */}
      <ConfirmSelect
        isOpen={showSaveConfirm}
        message="Are you sure you want to save these changes?"
        onConfirm={handleSaveConfirm}
        onCancel={() => setShowSaveConfirm(false)}
      />

      {/* Cancel Confirmation Dialog */}
      <ConfirmSelect
        isOpen={showCancelConfirm}
        message="Are you sure you want to cancel? Any unsaved changes will be lost."
        onConfirm={handleCancelConfirm}
        onCancel={() => setShowCancelConfirm(false)}
      />
    </div>
  );
};

export default EditUser;
