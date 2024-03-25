import { API_URL } from "../config";
import axios from "axios";

const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};

const getUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};

const addUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/users`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Server Response:", response);

    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateUser = async (updatedUserData) => {
  try {
    const { id, ...dataWithoutId } = updatedUserData || {};

    if (!id) {
      console.error("Invalid userId:", id);
      // Handle the case where userId is invalid or undefined
      return; // or throw an error, depending on your requirements
    }

    const response = await axios.put(`${API_URL}/users/${id}`, dataWithoutId, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;

    return data;
  } catch (error) {
    console.error("Failed to update user:", error);
    throw error;
  }
};

export { getUser, getUsers, addUser, updateUser, deleteUser };
