import React, { useEffect, useState } from "react";
import { getMap } from "../api/map";

const MapGallery = () => {
  const [maps, setMaps] = useState([]);

  useEffect(() => {
    const getMapsData = async () => {
      try {
        const mapsData = await getMap();
        setMaps(mapsData);
      } catch (error) {
        console.error("Failed to get maps:", error);
      }
    };

    getMapsData();
  }, []);

  useEffect(() => {
    // Log the base64 string of the first map to the console
    if (maps.length > 0) {
      console.log("Base64 String:", maps[0].image);
    }
  }, [maps]);

  return (
    <div>
      <h2>Map Gallery</h2>
      {maps.map((map) => (
        <div key={map.id}>
          <h3>{map.name}</h3>
          <img
            src={`data:image/png;base64,${map.image}`}
            alt={map.name}
            style={{ maxWidth: "100%" }}
          />
        </div>
      ))}
    </div>
  );
};

export { MapGallery };
