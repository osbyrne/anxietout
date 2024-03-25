import React, { useEffect, useState, useRef } from "react";
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
import { addItem, getItems } from "../api/item.js";

export const loader = () => getItems();

const AddItem = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [x_position, set_x_position] = useState(40.0);
  const [y_position, set_y_position] = useState(-100.0);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };
    fetchItems();
  }, []);

  const styles = `
  .paper{
    opacity:0.75;
  }
  .paper:hover{
    opacity:1;
  }
  `;

  const imageStyles = `
  .image-container {
    position: relative;
    width: 100%;
    height: 100%; 
  }

  .background-image {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; 
  }

  .overlay-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%; 
    object-fit: cover; 
  }
`;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!Array.isArray(items)) {
      setError("Error: items data not an array");
      return false;
    } // Check if items is iterable

    const nameExists = items.some((item) => item.name === name);
    if (nameExists) {
      setError("Name is already in use");
      return false;
    } // Check if name is already in use

    let item = {
      name: name,
      x_position: x_position,
      y_position: y_position,
    };

    addItem(item)
      .then((data) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to add item");
      });
  };

  const roomPlan = useRef(null);

  const setPosition = (event) => {
    const rect = roomPlan.current.getBoundingClientRect();
    set_x_position(parseInt(event.clientX - rect.left - 5));
    set_y_position(parseInt(event.clientY - rect.top - 5));
  };

  return (
    <Container component="main" maxWidth="xs">
      <style>{styles}</style>

      <Paper className="paper" style={{ padding: 20, marginTop: 10 }}>
        <Typography variant="h6" align="center">
          Add Item
        </Typography>

        <div className="image-container">
          <style>{imageStyles}</style>
          <img
            id="room_plan"
            src="/room_plan.jpg"
            alt="room_plan"
            ref={roomPlan}
            className="background-image"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onClick={setPosition}
          />

          <img
            id="red_dot"
            src="/red_dot.png"
            alt="red_dot"
            className="overlay-image"
            style={{
              width: "10px",
              height: "10px",
              objectFit: "cover",
              position: "absolute",
              left: `${x_position}px`,
              top: `${y_position}px`,
            }}
          />
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
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
                    x_position value:
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
                    y_position value:
                  </InputAdornment>
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="name"
                label="name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              {error && (
                <Typography color="error">Error Message: {error}</Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Add Item
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export { AddItem };
