import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMaps, updateMap } from "../api/map";
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Grid,
} from "@mui/material";

const MapUpdate = () => {
  const { mapId } = useParams();
  const [existingMap, setExistingMap] = useState(null);
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mapsData = await getMaps();
        const mapIdNumber = Number(mapId);

        if (isNaN(mapIdNumber) || mapId === undefined) {
          console.error("Invalid mapId:", mapId);
          return; // Exit early if mapId is not a valid number or undefined
        }

        const foundMap = mapsData.find((map) => map.id === mapIdNumber);
        if (foundMap) {
          setExistingMap(foundMap);
          setName(foundMap.name);
        } else {
          console.error("Map not found for update");
        }
      } catch (error) {
        console.error("Error fetching maps:", error);
      }
    };

    fetchData();
  }, [mapId]);

  const handleUpdate = async () => {
    try {
      // Ensure existingMap is defined before updating
      if (existingMap) {
        const updatedMap = { ...existingMap, name, file: selectedFile }; // Include selectedFile in the updatedMap
        await updateMap(updatedMap);
        console.log("Map updated successfully:", updatedMap);
        window.location.href = "/maps";
      } else {
        console.error("Cannot update map. Map data is missing.");
      }
    } catch (error) {
      console.error("Failed to update map:", error);
      // Handle errors more gracefully, show user-friendly error messages or redirect to an error page
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
      <Container component={Paper} elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Update Map
        </Typography>
        {existingMap && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>

            {/* File input */}
            <Grid item xs={12}>
              <Button variant="contained" component="label">
                Upload File
                <input
                  type="file"
                  hidden
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
              >
                Update Map
              </Button>
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
};

export { MapUpdate };
