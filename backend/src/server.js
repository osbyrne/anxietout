import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import multer from "multer";
const storage = multer.memoryStorage(); // Store files in memory (can be changed to disk storage)
const upload = multer({ storage: storage });

const prisma = new PrismaClient();
const app = express();

app.use(cors()); // needed when we run on a different port than the frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//////////////////////////////////////////////////
//                                              //
//                    USERS                     //
//                                              //
//////////////////////////////////////////////////

//╔═════════════════════════════════════╗
//║              get users              ║
//╚═════════════════════════════════════╝

app.get("/users/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    setTimeout(() => {
      res.json(users);
    }, 200);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to fetch users" });
  }
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "The id is required" });
  }

  if (!(!isNaN(id) && !isNaN(parseFloat(id)))) {
    return res.status(400).json({ error: "The id has to be number" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return res.status(404).json({ error: `User with ${id} not found` });
    }

    res.json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to fetch user" });
  }
});

//╔═════════════════════════════════════╗
//║              add user               ║
//╚═════════════════════════════════════╝

app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  } else if (typeof name !== "string" || typeof email !== "string") {
    return res.status(400).json({ error: "Name and email must be strings" });
  }

  try {
    const newUser = await prisma.user.create({ data: { name, email } });

    res.json(newUser);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//╔═════════════════════════════════════╗
//║           delete user               ║
//╚═════════════════════════════════════╝

app.delete("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    await prisma.user.delete({ where: { id: userId } });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Failed to delete user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

//╔═════════════════════════════════════╗
//║           update user               ║
//╚═════════════════════════════════════╝

app.put("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const updatedUserData = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updatedUserData,
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

//////////////////////////////////////////////////
//                                              //
//                   ITEMS                      //
//                                              //
//////////////////////////////////////////////////

//╔═════════════════════════════════════╗
//║            get all items            ║
//╚═════════════════════════════════════╝

app.get("/items/", async (req, res) => {
  try {
    const items = await prisma.item.findMany();

    setTimeout(() => {
      res.json(items);
    }, 200);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to fetch items :(" });
  }
});

//╔═════════════════════════════════════╗
//║             get item                ║
//╚═════════════════════════════════════╝

app.get("/items/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "The id is required" });
  }

  if (!(!isNaN(id) && !isNaN(parseFloat(id)))) {
    return res.status(400).json({ error: "The id has to be number" });
  }

  try {
    const item = await prisma.item.findUnique({
      where: { id: Number(id) },
    });

    if (!item) {
      return res.status(404).json({ error: `Item with ${id} not found` });
    }

    res.json(item);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to fetch item" });
  }
});

//╔═════════════════════════════════════╗
//║             add item                ║
//╚═════════════════════════════════════╝

app.post("/items", async (req, res) => {
  const { name, imagePath, x_position, y_position, mapId } = req.body;

  console.log("req.body:", req.body); // Log the request body for debugging

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  } else if (typeof name !== "string") {
    return res.status(400).json({ error: "Name must be strings" });
  } else if (name.length > 100) {
    return res.status(400).json({ error: "Name must be less than 100 chars" });
  }

  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
  // could  these checks been avoided if frontend usedtypescript...?    //
  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://

  try {
    const newItem = await prisma.item.create({
      data: { name, imagePath, x_position, y_position, mapId },
    });

    res.json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create item" });
  }
});

//╔═════════════════════════════════════╗
//║            delete item              ║
//╚═════════════════════════════════════╝

app.delete("/items/:id", async (req, res) => {
  const itemId = parseInt(req.params.id, 10);

  try {
    const existingItem = await prisma.item.findUnique({
      where: { id: itemId },
    });

    if (!existingItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    await prisma.item.delete({ where: { id: itemId } });

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Failed to delete item:", error);
    res.status(500).json({ error: "Failed to delete item" });
  }
});

//╔═════════════════════════════════════╗
//║            update item              ║
//╚═════════════════════════════════════╝

app.put("/items/:id", async (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const updatedItemData = req.body;

  try {
    const existingItem = await prisma.item.findUnique({
      where: { id: itemId },
    });

    if (!existingItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    const updatedItem = await prisma.item.update({
      where: { id: itemId },
      data: updatedItemData,
    });

    res.json(updatedItem);
  } catch (error) {
    console.error("Failed to update item:", error);
    res.status(500).json({ error: "Failed to update item" });
  }
});

//////////////////////////////////////////////////
//                                              //
//                     MAPS                     //
//                                              //
//////////////////////////////////////////////////

//╔═════════════════════════════════════╗
//║            get all maps             ║
//╚═════════════════════════════════════╝

app.get("/maps/", async (req, res) => {
  try {
    const maps = await prisma.map.findMany();

    // Simulate a delay for testing loading indicators
    await new Promise((resolve) => setTimeout(resolve, 200));

    res.json(maps);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to fetch maps" });
  }
});

//╔═════════════════════════════════════╗
//║               get map               ║
//╚═════════════════════════════════════╝
// Add a new endpoint to retrieve map data
app.get("/maps/images/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const map = await prisma.map.findUnique({
      where: { id: Number(id) },
    });

    if (!map) {
      return res.status(404).json({ error: `Map with ${id} not found` });
    }

    res.json({ id: map.id, name: map.name, image: map.image });
  } catch (error) {
    console.error("Error fetching map:", error);
    res.status(500).json({ error: "Unable to fetch map" });
  }
});
//╔═════════════════════════════════════╗
//║              add map                ║
//╚═════════════════════════════════════╝
app.post("/maps", upload.single("imageFile"), async (req, res) => {
  const { name } = req.body;
  const imageFile = req.file;

  try {
    // Check if name already exists
    const existingMap = await prisma.map.findUnique({
      where: { name: name },
    });

    if (existingMap) {
      return res.status(400).json({ error: "Name is already in use" });
    }

    // Determine the MIME type based on the file extension
    const mimeType = "image/png"; // Update this if using a different image format

    // Save the file data to the database
    const newMap = await prisma.map.create({
      data: {
        name: name,
        image: imageFile.buffer.toString("base64"), // Save binary data as base64
      },
    });

    res.json(newMap);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create map" });
  }
});
//╔═════════════════════════════════════╗
//║            delete map               ║
//╚═════════════════════════════════════╝

app.delete("/maps/:id", async (req, res) => {
  const mapId = parseInt(req.params.id, 10);

  if (isNaN(mapId) || mapId <= 0) {
    return res.status(400).json({ error: "Invalid map ID" });
  }

  try {
    const existingMap = await prisma.map.findUnique({ where: { id: mapId } });

    if (!existingMap) {
      return res.status(404).json({ error: "Map not found" });
    }

    // ... (other logic)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update map" });
  }
});

//╔═════════════════════════════════════╗
//║             update map              ║
//╚═════════════════════════════════════╝

// Route for updating a map by ID
app.put("/maps/:id", async (req, res) => {
  const mapId = parseInt(req.params.id, 10);
  const updatedMapData = req.body;

  try {
    const existingMap = await prisma.map.findUnique({ where: { id: mapId } });

    if (!existingMap) {
      return res.status(404).json({ error: "Map not found" });
    }

    const updatedMap = await prisma.map.update({
      where: { id: mapId },
      data: updatedMapData,
    });

    res.json(updatedMap);
  } catch (error) {
    console.error("Failed to update map:", error);
    res.status(500).json({ error: "Failed to update map" });
  }
});

export { app };
