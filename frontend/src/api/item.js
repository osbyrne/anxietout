import { API_URL } from "../config";
import axios from "axios";

const getItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/items`);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch items:", error);
    throw error;
  }
};

const getItem = async (itemId) => {
  try {
    const response = await axios.get(`${API_URL}/items/${itemId}`);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch items:", error);
    throw error;
  }
};

const addItem = async (item) => {
  try {
    const response = await axios.post(`${API_URL}/items`, item, {
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

const deleteItem = async (itemId) => {
  try {
    const response = await axios.delete(`${API_URL}/items/${itemId}`, {
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

const updateItem = async (updatedItemData) => {
  try {
    const { id, ...dataWithoutId } = updatedItemData || {};

    if (!id) {
      console.error("Invalid itemId:", id);
      // Handle the case where itemId is invalid or undefined
      return; // or throw an error, depending on your requirements
    }

    const response = await axios.put(`${API_URL}/items/${id}`, dataWithoutId, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;

    return data;
  } catch (error) {
    console.error("Failed to update item:", error);
    throw error;
  }
};

export { getItem, getItems, addItem, updateItem, deleteItem };
