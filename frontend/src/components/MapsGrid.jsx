import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { MapGallery } from "./MapGallery";

import { getMaps, deleteMap } from "../api/map";

export const loader = () => getMaps();

const MapsGrid = () => {
  const [maps, setMaps] = useState([]);
  const [hoveredMapId, setHoveredMapId] = useState(null);

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

  const styles = `
  .card {
    transition : all 0.3s ease;
    opacity:0.75;
  }
  .card:hover{
    background-color: #f2f2f2;
    transform:scale(1.1);
    transition : all 0.3s ease;
    opacity:0.5;
  }
  .button-container{
    position : absolute;
    bottom: 10px;
    left: 50%;
    transform : translateX(-50%);
    display: flex;
    gap: 8px;
    justify-content: hover;
  }
  `;

  const deleteMapLocal = async (itemId) => {
    await deleteMap(itemId);
    window.location.reload();
  };

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

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 15,
          marginTop: "20px",
          marginBottom: "30px",
        }}
      >
        <style>{styles}</style>
        {maps.map((map) => (
          <Card
            key={map.id}
            className="card"
            sx={{ padding: 2, width: 300, height: 200, position: "relative" }}
            onMouseEnter={() => setHoveredMapId(map.id)}
            onMouseLeave={() => setHoveredMapId(null)}
          >
            <CardContent>
              <Typography>Name: {map.name}</Typography>
              <Typography>Id: {map.id}</Typography>
              {hoveredMapId !== map.id && (
                <MapGallery
                  x={map.x_position}
                  y={map.y_position}
                  hovered="false"
                />
              )}

              {hoveredMapId === map.id && (
                <div className="button-container">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() =>
                      (window.location.href = "/update/maps/" + map.id)
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={() => deleteMapLocal(map.id)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export { MapsGrid };
