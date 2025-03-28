// src/components/ui/SortMenu.jsx
// This component displays a dropdown menu to sort the list of users.

import React, { useState } from "react";
import Button from "./Button";
import { FaSort, FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";

const SortMenu = ({ sortOption, setSortOption }) => {
  const [showSortMenu, setShowSortMenu] = useState(false);

  // Handle sort option selection
  const handleSortChange = (option) => {
    setSortOption(option);
    setShowSortMenu(false);
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setShowSortMenu(!showSortMenu)}
        variant="primary"
        size="small"
        className="flex items-center"
        icon={<FaSort />}
      >
        Sort
      </Button>
      {showSortMenu && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 cursor:pointer overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(10px)",
            position: "fixed",
            top: "auto",
            transform: "translateX(-20px) translateY(-5px)",
            overflow: "auto",
          }}
        >
          <div className="py-1">
            <button
              className={`w-full text-left rounded-t-lg px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 flex items-center ${
                sortOption === "none" ? "bg-gray-200" : ""
              }`}
              onClick={() => handleSortChange("none")}
            >
              Default Order
            </button>
            <button
              className={`w-full text-left px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 flex items-center ${
                sortOption === "nameAsc" ? "bg-gray-200" : ""
              }`}
              onClick={() => handleSortChange("nameAsc")}
            >
              <FaSortAlphaDown className="mr-2" /> Name (A-Z)
            </button>
            <button
              className={`w-full text-left px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 flex items-center ${
                sortOption === "nameDesc" ? "bg-gray-200" : ""
              }`}
              onClick={() => handleSortChange("nameDesc")}
            >
              <FaSortAlphaDownAlt className="mr-2" /> Name (Z-A)
            </button>
            <button
              className={`w-full text-left px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 flex items-center ${
                sortOption === "emailAsc" ? "bg-gray-200" : ""
              }`}
              onClick={() => handleSortChange("emailAsc")}
            >
              <FaSortAlphaDown className="mr-2" /> Email (A-Z)
            </button>
            <button
              className={`w-full text-left rounded-b-lg px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 flex items-center ${
                sortOption === "emailDesc" ? "bg-gray-200" : ""
              }`}
              onClick={() => handleSortChange("emailDesc")}
            >
              <FaSortAlphaDownAlt className="mr-2" /> Email (Z-A)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortMenu;
