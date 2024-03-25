import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { Minimap } from "./Minimap";

import { getItems, deleteItem } from "../api/item";

export const loader = () => getItems();

const ItemsGrid = () => {
  const [items, setItems] = useState([]);
  const [hoveredItemId, setHoveredItemId] = useState(null);

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
  .card {
    transition : all 0.3s ease;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
    opacity:0.75;
  }
  .card:hover{
    background-color: #f2f2f2;
    transform:scale(1.1);
    background-color: rgba(128, 128, 128, 0.5);
  }
  .card-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 4px;
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

  const deleteItemLocal = async (itemId) => {
    await deleteItem(itemId);
    window.location.reload();
  };

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

  return (
    <>
      <style>{styles}</style>
      <div className="card-container">
        {items.map((item) => (
          <Card
            key={item.id}
            className="card"
            sx={{ padding: 2, width: 300, height: 200, position: "relative" }}
            onMouseEnter={() => setHoveredItemId(item.id)}
            onMouseLeave={() => setHoveredItemId(null)}
          >
            <CardContent>
              {hoveredItemId !== item.id && (
                <Minimap x={item.x_position} y={item.y_position} />
              )}

              {hoveredItemId === item.id && (
                <div>
                  <Typography>Name: {item.name}</Typography>
                  <Typography>Id: {item.id}</Typography>

                  <div className="button-container">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() =>
                        (window.location.href = "/update/item/" + item.id)
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={() => deleteItemLocal(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export { ItemsGrid };
