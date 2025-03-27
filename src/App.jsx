import React from "react";
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

// Header component with logout button
const Header = () => {
  const { resetData } = useUserContext();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <header className="bg-black/80 backdrop-blur-md p-4 sticky top-0 z-10 w-full">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-white text-xl font-bold mr-4">Users List</div>

        <div className="flex items-center space-x-4">
          <Button onClick={() => resetData()} variant="primary" size="small">
            Reset Data
          </Button>
          <Button onClick={handleLogout} variant="danger" size="small">
            Logout
          </Button>
        </div>
      </div>
    </header>
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
