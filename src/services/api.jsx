// src/services/api.jsx
// This file contains the functions to interact with the API.

import axios from "axios";

const BASE_URL = "https://reqres.in/api"; // This is the base URL for the API that was asked to use.

// This function is used to login the user. It takes email and password as arguments and returns the response data.
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
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
    const response = await axios.get(`${BASE_URL}/users?page=${page}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// This function is used to edit the user. It takes userData as an argument and returns the response data.
// The userData is an object containing the user data.
// The id is the id of the user to be edited.
export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// This function is used to delete the user. It takes id as an argument and returns the response data.
// The id is the id of the user to be deleted.
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
