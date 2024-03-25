// AddMap.jsx
import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Input,
} from "@mui/material";
import { getMaps, addMap } from "../api/map.js";

export const loader = () => getMaps();

const AddMap = () => {
  const [maps, setMaps] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchMaps = async () => {
      try {
        const data = await getMaps();
        setMaps(data);
      } catch (error) {
        console.error("Failed to fetch maps:", error);
      }
    };

    fetchMaps();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if maps is iterable
    if (!Array.isArray(maps)) {
      setError("Error: maps data not an array");
      return false;
    }

    // Check if name is already in use
    const nameExists = maps.some((map) => map.name === name);
    if (nameExists) {
      setError("Name is already in use");
      return false;
    }

    addMap({ name, imageFile })
      .then((data) => {
        console.log("Map added successfully:", data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Failed to add map:", error);
        setError("Failed to add map");
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper style={{ padding: 20, marginTop: 10 }}>
        <Typography variant="h6" align="center">
          Add Map
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
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
                type="file"
                inputProps={{ accept: "image/*" }}
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </Grid>

            <Grid item xs={12}>
              {error && <Typography color="error">{error}</Typography>}
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Add Map
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export { AddMap };
