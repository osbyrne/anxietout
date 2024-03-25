import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItems, updateItem } from "../api/item";
import {
  TextField,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Input,
  InputAdornment,
} from "@mui/material";

const ItemUpdate = () => {
  const { itemId } = useParams();
  const [existingItem, setExistingItem] = useState(null);
  const [name, setName] = useState("");
  const [x_position, setX_position] = useState(0);
  const [y_position, setY_position] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsData = await getItems();
        const itemIdNumber = Number(itemId);

        if (isNaN(itemIdNumber) || itemId === undefined) {
          console.error("Invalid itemId:", itemId);
          return; // Exit early if itemId is not a valid number or undefined
        }

        const foundItem = itemsData.find((item) => item.id === itemIdNumber);
        if (foundItem) {
          setExistingItem(foundItem);
          setName(foundItem.name);
          setX_position(foundItem.x_position);
          setY_position(foundItem.y_position);
        } else {
          console.error("Item not found for update");
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchData();
  }, [itemId]);

  const handleUpdate = async () => {
    try {
      // Ensure existingItem is defined before updating
      if (existingItem) {
        const updatedItem = { ...existingItem, name, x_position, y_position };
        await updateItem(updatedItem);
        console.log("Item updated successfully:", updatedItem);
        window.location.href = "/items";
      } else {
        console.error("Cannot update item. Item data is missing.");
      }
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/background.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        minHeight: "100vh",
        backgroundAttachment: "fixed",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper style={{ padding: 20, marginTop: 10 }}>
          <Typography variant="h6" align="center">
            Update Item
          </Typography>
          <form onSubmit={handleUpdate} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  variant="outlined"
                  fullWidth
                  id="x_position"
                  type="number"
                  readOnly
                  value={x_position}
                  startAdornment={
                    <InputAdornment position="start">
                      X Position:
                    </InputAdornment>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  variant="outlined"
                  fullWidth
                  id="y_position"
                  type="number"
                  readOnly
                  value={y_position}
                  startAdornment={
                    <InputAdornment position="start">
                      Y Position:
                    </InputAdornment>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Update Item
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export { ItemUpdate };
