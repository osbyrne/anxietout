import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItems } from "../api/item";

const ItemDetails = () => {
  const { itemId } = useParams();
  const [existingItem, setExistingItem] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsData = await getItems();

        // Ensure itemId is a valid number
        const itemIdNumber = Number(itemId);

        if (isNaN(itemIdNumber) || itemId === undefined) {
          console.error("Invalid itemId:", itemId);
          return; // Exit early if itemId is not a valid number or undefined
        }

        // Find the existing item based on itemId
        const foundItem = itemsData.find((item) => item.id === itemIdNumber);

        if (foundItem) {
          setExistingItem(foundItem);
          setName(foundItem.name);
        } else {
          console.error("Item not found for update");
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchData();
  }, [itemId]);
  return <div>{itemId}</div>;
};

export { ItemDetails };
