import React, { useState, useEffect } from "react";
import { TextField, List, ListItem, ListItemText, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { getItems } from "../api/item.js";

export const loader = () => getItems();

const SearchItems = () => {
  const [input, setInput] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Check if input has a value before fetching and filtering
        if (input.trim() !== "") {
          const data = await getItems();
          setFilteredItems(
            data.filter((item) =>
              item.name.toLowerCase().includes(input.toLowerCase())
            )
          );
        } else {
          // If input is empty, set filteredItems to an empty array
          setFilteredItems([]);
        }
      } catch (error) {
        console.error("Error fetching and filtering items:", error);
      }
    };

    fetchItems();

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
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
      }}
    >
      <TextField
        type="text"
        placeholder="Type to search..."
        value={input}
        name="search"
        onChange={handleInputChange}
        sx={{ width: "300px", marginBottom: 2 }}
      />
      <List>
        {filteredItems.map((item) => (
          <ListItem key={item.id}>
            <Link to={`/items/${item.id}`}>
              <ListItemText primary={item.name} />
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export { SearchItems };
