// src/components/ui/ConfirmSelect.jsx
// This component displays a confirmation dialog with a message and two buttons to confirm or cancel an action.

import React from "react";
import Button from "./Button";

const ConfirmSelect = ({ message, onConfirm, onCancel, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md mx-auto my-auto"
        style={{
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
          position: "relative",
          top: "auto",
          transform: "translateY(0)",
          maxHeight: "calc(100vh - 100px)",
          overflow: "auto",
        }}
      >
        <p className="text-center text-lg font-medium mb-6">{message}</p>
        <div className="flex justify-center space-x-4">
          <Button onClick={onConfirm} variant="success" size="medium">
            Ok
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onCancel();
            }}
            variant="secondary"
            size="medium"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSelect;
