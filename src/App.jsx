import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Login from "./components/Login";
import UserList from "./components/UserList";
import EditUser from "./components/EditUser";
import {
  isAuthenticated,
  logout,
  setAuthHistory,
  clearAuthHistory,
  setupVisibilityCheck,
} from "./utils/auth";
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
    clearAuthHistory(); // Clear auth history state
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

// AuthCheck component to handle history navigation
const AuthCheck = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Run authentication check on component mount
  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated()) {
        // Redirect to login if not authenticated
        navigate("/", { replace: true });
      } else {
        // Set auth history state when authenticated
        setAuthHistory();
      }
    };
    checkAuth();

    // Add popstate event listener to handle back/forward navigation
    const handlePopState = () => {
      checkAuth();
    };

    window.addEventListener("popstate", handlePopState);

    // Handle when user returns to the tab
    setupVisibilityCheck();

    // Add beforeunload event listener to help with page refresh cases
    const handleBeforeUnload = () => {
      // This sets a flag that we're navigating away, helping distinguish
      // between refresh and back button in some browsers (chromium based mostly)
      sessionStorage.setItem("pageRefreshing", "true");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clear the refresh flag since we're still in the app
    sessionStorage.removeItem("pageRefreshing");

    // Re-run auth check whenever location changes
    checkAuth();

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [navigate, location]);

  // Run auth check when the component renders and whenever location changes
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  // Check authentication immediately before rendering
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://wallpapercat.com/w/full/4/6/f/1228445-2309x1299-desktop-hd-good-luck-background-photo.jpg')",
      }}
    >
      <AuthCheck>
        <Header />
        <div className="flex-1">{children}</div>
      </AuthCheck>
    </div>
  );
};

// LoginWrapper to clear logout flag when accessing login page
const LoginWrapper = () => {
  useEffect(() => {
    // Clear the logged out flag when user intentionally goes to login page
    sessionStorage.removeItem("loggedOut");
    clearAuthHistory();
  }, []);

  return <Login />;
};

// App component with routes
function App() {
  // Run auth check on initial load
  useEffect(() => {
    // Check if user is on a protected route but not authenticated
    const isProtectedRoute = window.location.pathname !== "/";
    if (isProtectedRoute && !isAuthenticated()) {
      window.location.replace("/");
    }
  }, []);

  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<LoginWrapper />} />
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
          {/* Catch all route for any other paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
