import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getMaps } from "../api/map.js";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";

export const loader = () => getMaps();

const SearchMap = () => {
  const [input, setInput] = useState("");
  const [filteredMaps, setFilteredMaps] = useState([]);

  useEffect(() => {
    const fetchMaps = async () => {
      try {
        // Check if input has a value before fetching and filtering
        if (input.trim() !== "") {
          const data = await getMaps();
          setFilteredMaps(
            data.filter((map) =>
              map.name.toLowerCase().includes(input.toLowerCase())
            )
          );
        } else {
          // If input is empty, set filteredMaps to an empty array
          setFilteredMaps([]);
        }
      } catch (error) {
        console.error("Error fetching and filtering maps:", error);
      }
    };

    fetchMaps();

    // Cleanup function to cancel any ongoing requests if component unmounts
    return () => {
      // Your cleanup logic (e.g., canceling ongoing requests)
    };
  }, [input]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    // You can perform additional actions based on the input value if needed
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "80%", md: "60%", lg: "25%", xl: "15%" },
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          type="text"
          placeholder="Type to search..."
          value={input}
          name="search"
          onChange={handleInputChange}
          sx={{ width: "300px", marginBottom: "5px", marginTop: "5px" }}
        />
        <List>
          {filteredMaps.map((map) => (
            <ListItem key={map.id}>
              <Link to={`/maps/${map.id}`}>
                <ListItemText primary={map.name} />
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export { SearchMap };
