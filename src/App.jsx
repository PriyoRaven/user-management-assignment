import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import UserList from "./components/UserList";
import EditUser from "./components/EditUser";
import { isAuthenticated, logout } from "./utils/auth";
import Button from "./components/ui/Button";
import { UserProvider, useUserContext } from "./context/UserContext";
import ConfirmSelect from "./components/ui/ConfirmSelect";
import { FaSearch } from "react-icons/fa";

// Header component with logout button and search bar
const Header = () => {
  const { resetData, searchTerm, setSearchTerm } = useUserContext();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const handleResetData = () => {
    resetData();
    setShowResetConfirm(false);
  };

  const handleLogoutClick = (e) => {
    e.stopPropagation();
    setShowLogoutConfirm(true);
  };

  const handleResetClick = (e) => {
    e.stopPropagation();
    setShowResetConfirm(true);
  };

  return (
    <>
      <header className="bg-black/80 backdrop-blur-md px-2 lg:px-20 py-2 sticky top-0 z-10 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center max-w-screen mx-auto gap-2">
          <div className="text-white text-xl font-bold">Users List</div>

          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-full bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" />
          </div>

          <div className="flex items-center space-x-4">
            <Button onClick={handleResetClick} variant="primary" size="small">
              Reset Data
            </Button>
            <Button onClick={handleLogoutClick} variant="danger" size="small">
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Dialog */}
      <ConfirmSelect
        isOpen={showLogoutConfirm}
        message="Are you sure you want to logout?"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />

      {/* Reset Data Confirmation Dialog */}
      <ConfirmSelect
        isOpen={showResetConfirm}
        message="Are you sure you want to reset all data? This action cannot be undone."
        onConfirm={handleResetData}
        onCancel={() => setShowResetConfirm(false)}
      />
    </>
  );
};

// PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://wallpapercat.com/w/full/4/6/f/1228445-2309x1299-desktop-hd-good-luck-background-photo.jpg')",
      }}
    >
      <Header />
      <div className="flex-1">{children}</div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

// App component with routes
function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <UserList />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <EditUser />
              </PrivateRoute>
            }
          />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
