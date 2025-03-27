import React, { useState } from "react";
import { login } from "../services/api";
import { setToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("eve.holt@reqres.in"); // Set default email
  const [password, setPassword] = useState("cityslicka"); // Set default password
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [error, setError] = useState(""); // Error message
  const navigate = useNavigate(); // Navigation object

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email");
      return;
    }

    // For this test API, we require specifically "cityslicka" as password and more than 6 characters
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await login(email, password);
      setToken(response.token); // Store token with expiration
      navigate("/users");
    } catch (err) {
      if (err.error === "user not found") {
        setError("Invalid email");
      } else if (
        err.error === "invalid password" ||
        password !== "cityslicka"
      ) {
        setError("Invalid password - hint: use 'cityslicka'");
      } else {
        setError("Invalid login credentials");
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://wallpapercat.com/w/full/4/6/f/1228445-2309x1299-desktop-hd-good-luck-background-photo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleLogin}
        className="p-8 rounded shadow-md w-5/6 md:w-96"
        style={{
          background: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <h2 className="text-3xl font-bold text-center mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded mb-4 outline-hidden focus:border-b-4"
          required
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} // Toggle input type
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border rounded mb-4 outline-hidden focus:border-b-4"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Toggle visibility
            className="absolute right-3 top-3 text-gray-600 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <Button
          type="submit"
          variant="secondary"
          size="medium"
          className="w-full"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
