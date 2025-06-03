import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// Create axios instance with default headers
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-api-key': API_KEY,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// This function is used to login the user. It takes email and password as arguments and returns the response data.
export const login = async (email, password) => {
  try {
    const response = await apiClient.post('/login', { email, password });
    if (response.status !== 200) {
      throw new Error("Invalid login credentials");
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Login failed" };
  }
};

// This function is used to fetch the users. It takes page as an argument and returns the response data.
// The default value of page is 1.
export const fetchUsers = async (page = 1) => {
  try {
    const response = await apiClient.get(`/users?page=${page}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Failed to fetch users" };
  }
};

// This function is used to edit the user. It takes userData as an argument and returns the response data.
// The userData is an object containing the user data.
// The id is the id of the user to be edited.
export const updateUser = async (id, userData) => {
  try {
    const response = await apiClient.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Failed to update user" };
  }
};

// This function is used to delete the user. It takes id as an argument and returns the response data.
// The id is the id of the user to be deleted.
export const deleteUser = async (id) => {
  try {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Failed to delete user" };
  }
};