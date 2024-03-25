import React from "react";
import { AddMap } from "../components/AddMaps";
import { SearchMap } from "../components/SearchMap";
import { MapsGrid } from "../components/MapsGrid";

const Maps = () => {
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
      <SearchMap />
      <MapsGrid />
      <AddMap />
    </div>
  );
};

export { Maps };
