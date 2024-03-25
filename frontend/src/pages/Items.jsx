import React from "react";
import { AddItem } from "../components/AddItem";
import { SearchItems } from "../components/SearchItems";
import { ItemsGrid } from "../components/ItemsGrid";

const Items = () => {
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
      <SearchItems />
      <ItemsGrid />
      <AddItem />
    </div>
  );
};

export { Items };
