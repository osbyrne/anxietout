import { API_URL } from "../config";
import axios from "axios";

const getMaps = async () => {
  try {
    const response = await axios.get(`${API_URL}/maps`);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch maps:", error);
    throw error;
  }
};

const getMap = async (mapId) => {
  try {
    const response = await axios.get(`${API_URL}/maps/${mapId}`);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch maps:", error);
    throw error;
  }
};

const addMap = async (map) => {
  try {
    const response = await axios.post(`${API_URL}/maps`, map, {
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

const deleteMap = async (mapId) => {
  try {
    const response = await axios.delete(`${API_URL}/maps/${mapId}`, {
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

const updateMap = async (updatedMapData) => {
  try {
    const { id, ...dataWithoutId } = updatedMapData || {};

    if (!id) {
      console.error("Invalid mapId:", id);
      // Handle the case where mapId is invalid or undefined
      return; // or throw an error, depending on your requirements
    }

    const response = await axios.put(`${API_URL}/maps/${id}`, dataWithoutId, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;

    return data;
  } catch (error) {
    console.error("Failed to update map:", error);
    throw error;
  }
};

export { getMap, getMaps, addMap, updateMap, deleteMap };
